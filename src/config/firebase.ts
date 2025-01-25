import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase only if config is available
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;

// Initialize services with null fallbacks
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const messaging = app ? (async () => {
  const isMessagingSupported = await isSupported();
  return isMessagingSupported ? getMessaging(app) : null;
})() : null;