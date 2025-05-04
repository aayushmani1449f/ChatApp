
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlecHM5x1eDZVhhdp6m2thtjWKlQ856lQ",
  authDomain: "mychatapp-9f13c.firebaseapp.com",
  projectId: "mychatapp-9f13c",
  storageBucket: "mychatapp-9f13c.firebasestorage.app",
  messagingSenderId: "142541650055",
  appId: "1:142541650055:web:dec2eb8b207305952da022",
  measurementId: "G-4PFEXMD90Z"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

