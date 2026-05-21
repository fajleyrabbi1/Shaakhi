import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInAnonymously as firebaseSignInAnonymously, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  type User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import type { User } from './types';

/**
 * Creates or updates the user profile document in Firestore `users` collection.
 */
export async function createUserDocument(user: FirebaseUser, additionalData?: Partial<User>) {
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { email, displayName, photoURL } = user;
    const newUser: User = {
      uid: user.uid,
      displayName: displayName || 'বেনামী ব্যবহারকারী',
      photoURL: photoURL || '',
      bio: '',
      email: email || '',
      role: 'user',
      badges: [],
      district: '',
      joinedAt: new Date(),
      followedCases: [],
      postCount: 0,
      isVerified: false,
      districtAlerts: false,
      ...additionalData
    };

    try {
      await setDoc(userRef, {
        ...newUser,
        joinedAt: serverTimestamp()
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user document:', error);
      return null;
    }
  }

  return userSnap.data() as User;
}

/**
 * Sign in using Google OAuth.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await createUserDocument(result.user);
    }
    return result.user;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

/**
 * Sign in with Email and Password.
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email sign in error:', error);
    throw error;
  }
}

/**
 * Register a new user with Email, Password and Display Name.
 */
export async function registerWithEmail(email: string, password: string, displayName: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    await createUserDocument(result.user, { displayName });
    return result.user;
  } catch (error) {
    console.error('Email registration error:', error);
    throw error;
  }
}

/**
 * Sign in anonymously.
 */
export async function signInAnonymously() {
  try {
    const result = await firebaseSignInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Anonymous sign in error:', error);
    throw error;
  }
}

/**
 * Sign out current user.
 */
export async function signOutUser() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Listen to auth state changes.
 */
export function onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}
