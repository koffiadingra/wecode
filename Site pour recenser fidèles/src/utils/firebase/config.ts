import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCuFJ-aSoZRiYweBoVHXiGVPWLeLaJp2KU",
  authDomain: "eglise-c78f6.firebaseapp.com",
  projectId: "eglise-c78f6",
  storageBucket: "eglise-c78f6.firebasestorage.app",
  messagingSenderId: "68188778842",
  appId: "1:68188778842:web:32b2fd41c29c10531c4363",
  measurementId: "G-LZV2NQKEED"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics non disponible:', error);
  }
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
export default app;
