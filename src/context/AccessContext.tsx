import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserAccess {
  user_id: string;
  diagnostico_comprado: boolean;
  mappingCredits: number;
  clube_ativo: boolean;
  reprogramacao_pessoal_comprada: boolean;
  reprogramar_eu_comprado: boolean;
  mapa_completo_comprado?: boolean;
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

  const fetchAccess = async (uid?: string, email?: string) => {
    try {
      let url = '/api/user-access';
      if (uid) {
        url = `/api/user-access?uid=${uid}`;
        if (email) {
          url += `&email=${encodeURIComponent(email)}`;
        }
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAccess(data);
    } catch (error) {
      console.error('Failed to fetch access:', error);
      // Set default anonymous access on error
      setAccess({
        user_id: "error",
        diagnostico_comprado: false,
        mappingCredits: 0,
        clube_ativo: false,
        reprogramacao_pessoal_comprada: false,
        reprogramar_eu_comprado: false,
        mapa_completo_comprado: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribeUsers: (() => void) | null = null;
    let unsubscribeUserAccess: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Clean up previous listeners if any
      if (unsubscribeUsers) {
        unsubscribeUsers();
        unsubscribeUsers = null;
      }
      if (unsubscribeUserAccess) {
        unsubscribeUserAccess();
        unsubscribeUserAccess = null;
      }

      if (user) {
        // Initial fetch
        fetchAccess(user.uid, user.email || undefined);

        // Listen in real-time to users collection
        try {
          unsubscribeUsers = onSnapshot(doc(db, 'users', user.uid), () => {
            fetchAccess(user.uid, user.email || undefined);
          }, (err) => {
            console.error("Error listening to users collection changes in AccessContext:", err);
          });
        } catch (e) {
          console.error("Failed to subscribe to users updates in AccessContext:", e);
        }

        // Listen in real-time to user_access collection
        try {
          unsubscribeUserAccess = onSnapshot(doc(db, 'user_access', user.uid), () => {
            fetchAccess(user.uid, user.email || undefined);
          }, (err) => {
            console.error("Error listening to user_access collection changes in AccessContext:", err);
          });
        } catch (e) {
          console.error("Failed to subscribe to user_access updates in AccessContext:", e);
        }

      } else {
        fetchAccess();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUsers) unsubscribeUsers();
      if (unsubscribeUserAccess) unsubscribeUserAccess();
    };
  }, []);

  const simulatePurchase = (type: 'diagnostico' | 'clube' | 'reprogramacao_pessoal' | 'reprogramar_eu') => {
    // Simulation disabled for production
    console.log(`Simulation of ${type} purchase requested but disabled.`);
  };

  return (
    <AccessContext.Provider value={{ access, loading, refreshAccess: (uid?: string) => fetchAccess(uid || auth.currentUser?.uid, auth.currentUser?.email || undefined), simulatePurchase }}>
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
