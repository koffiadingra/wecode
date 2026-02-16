import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
// Pour utiliser votre propre projet Firebase, remplacez ces valeurs
// ou définissez-les dans les variables d'environnement
const firebaseConfig = {
  apiKey: "AIzaSyDemo_ReplaceWithYourOwnKey",
  authDomain: "demo-eglise-app.firebaseapp.com",
  projectId: "demo-eglise-app",
  storageBucket: "demo-eglise-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;