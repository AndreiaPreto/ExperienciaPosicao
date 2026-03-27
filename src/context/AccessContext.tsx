import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface UserAccess {
  user_id: string;
  diagnostico_comprado: boolean;
  clube_ativo: boolean;
  reprogramacao_pessoal_comprada: boolean;
  reprogramar_eu_comprado: boolean;
}

interface AccessContextType {
  access: UserAccess | null;
  loading: boolean;
  refreshAccess: (uid?: string) => Promise<void>;
  simulatePurchase: (type: 'diagnostico' | 'clube') => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export const AccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [access, setAccess] = useState<UserAccess | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccess = async (uid?: string) => {
    try {
      // Check for demo mode first
      const isDemo = localStorage.getItem('demo_mode') === 'true';
      if (isDemo && !uid) {
        const demoAccess = localStorage.getItem('demo_access');
        if (demoAccess) {
          setAccess({
            user_id: "demo_user",
            ...JSON.parse(demoAccess)
          });
          setLoading(false);
          return;
        }
      }

      const url = uid ? `/api/user-access?uid=${uid}` : '/api/user-access';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Merge with demo access if in demo mode
      if (isDemo) {
        const demoAccess = localStorage.getItem('demo_access');
        if (demoAccess) {
          const parsed = JSON.parse(demoAccess);
          data.diagnostico_comprado = data.diagnostico_comprado || parsed.diagnostico_comprado;
          data.clube_ativo = data.clube_ativo || parsed.clube_ativo;
        }
      }
      
      setAccess(data);
    } catch (error) {
      console.error('Failed to fetch access:', error);
      
      // Fallback to demo access on error if available
      const demoAccess = localStorage.getItem('demo_access');
      if (demoAccess) {
        setAccess({
          user_id: "demo_user",
          ...JSON.parse(demoAccess)
        });
      } else {
        // Set default anonymous access on error
        setAccess({
          user_id: "error",
          diagnostico_comprado: false,
          clube_ativo: false,
          reprogramacao_pessoal_comprada: false,
          reprogramar_eu_comprado: false,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAccess(user.uid);
      } else {
        fetchAccess();
      }
    });

    return () => unsubscribe();
  }, []);

  const simulatePurchase = (type: 'diagnostico' | 'clube' | 'reprogramacao_pessoal' | 'reprogramar_eu') => {
    if (!access) return;
    setAccess({
      ...access,
      diagnostico_comprado: type === 'diagnostico' ? true : access.diagnostico_comprado,
      clube_ativo: type === 'clube' ? true : access.clube_ativo,
      reprogramacao_pessoal_comprada: type === 'reprogramacao_pessoal' ? true : access.reprogramacao_pessoal_comprada,
      reprogramar_eu_comprado: type === 'reprogramar_eu' ? true : access.reprogramar_eu_comprado,
    });
  };

  return (
    <AccessContext.Provider value={{ access, loading, refreshAccess: (uid?: string) => fetchAccess(uid || auth.currentUser?.uid), simulatePurchase }}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
};
