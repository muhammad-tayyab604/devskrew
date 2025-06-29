import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAnvOHLMNJSGVryIwNfvLHA9d8OAFC2Z2o",
  authDomain: "dskrew-dfea8.firebaseapp.com",
  projectId: "dskrew-dfea8",
  storageBucket: "dskrew-dfea8.firebasestorage.app",
  messagingSenderId: "904140533946",
  appId: "1:904140533946:web:4ce444d31588c30d9a5283",
  measurementId: "G-642PQJ6EL8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;