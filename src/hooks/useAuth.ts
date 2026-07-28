import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { handleFirestoreError } from '../services/firestoreHelpers';
import { OperationType } from '../types/diagnostico';

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [authError, setAuthError] = useState<string | React.ReactNode>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      try {
        setUser(u);
        if (u) {
          try {
            const userDoc = await getDoc(doc(db, 'users', u.uid));
            let data = userDoc.data();
            const isDefaultAdmin = !!(u.email && u.email.toLowerCase() === "andreiapreto@gmail.com");
            if (isDefaultAdmin && data?.role !== 'admin') {
              await setDoc(doc(db, 'users', u.uid), {
                uid: u.uid,
                email: u.email,
                name: data?.name || u.displayName || 'Andréia Preto',
                role: 'admin',
                updatedAt: new Date().toISOString()
              }, { merge: true });
              const updatedDoc = await getDoc(doc(db, 'users', u.uid));
              data = updatedDoc.data();
            }
            setUserData(data || null);
            setIsAdmin(data?.role === 'admin' || isDefaultAdmin);
          } catch (error) {
            handleFirestoreError(error, OperationType.GET, `users/${u.uid}`);
          }
        } else {
          setIsAdmin(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
      } finally {
        setIsAuthInitialized(true);
        const params = new URLSearchParams(window.location.search);
        const isPaymentSuccess = params.get('payment_success') === 'true';
        if (!isPaymentSuccess) {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setIsAdmin(false);
  };

  return {
    user,
    setUser,
    userData,
    setUserData,
    isAdmin,
    setIsAdmin,
    loading,
    setLoading,
    isAuthInitialized,
    authError,
    setAuthError,
    handleLogout
  };
}
