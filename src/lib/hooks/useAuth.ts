'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  registerWithEmail, 
  signInAnonymously, 
  signOutUser, 
  onAuthStateChange,
  createUserDocument
} from '@/lib/firebase/auth';
import { getUser } from '@/lib/firebase/firestore';

/**
 * 'useAuth' custom hook coordinates Firebase Authentication updates
 * with Sakkhi's Zustand global `authStore` and custom Firestore profile states.
 */
export function useAuth() {
  const { user, loading, isAuthenticated, role, setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Attempt to retrieve full user document from firestore
          let userProfile = await getUser(firebaseUser.uid);
          
          if (!userProfile) {
            // Document might not be created yet, force synchronization
            userProfile = await createUserDocument(firebaseUser);
          }

          if (userProfile) {
            setUser(userProfile);
          } else {
            clearUser();
          }
        } catch (error) {
          console.error('Error synchronizing user profile:', error);
          clearUser();
        }
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading]);

  return {
    user,
    loading,
    isAuthenticated,
    role,
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    signInAnonymously,
    signOut: signOutUser
  };
}
