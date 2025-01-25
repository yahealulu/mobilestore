import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { store } from '../store';
import { setUser, logout } from '../store/slices/authSlice';

export const registerUser = async (email: string, password: string) => {
  if (!auth) {
    console.warn('Firebase auth is not initialized');
    return null;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  if (!auth) {
    console.warn('Firebase auth is not initialized');
    return null;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  if (!auth) {
    console.warn('Firebase auth is not initialized');
    return;
  }

  try {
    await signOut(auth);
    store.dispatch(logout());
  } catch (error) {
    throw error;
  }
};

export const initializeAuth = () => {
  if (!auth) {
    console.warn('Firebase auth is not initialized');
    return;
  }

  onAuthStateChanged(auth, (user: FirebaseUser | null) => {
    if (user) {
      store.dispatch(
        setUser({
          id: user.uid,
          email: user.email || '',
          name: user.displayName || 'User',
        })
      );
    } else {
      store.dispatch(logout());
    }
  });
};