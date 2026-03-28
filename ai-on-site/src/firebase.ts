import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUJOMiDB2DW5FamQLOyi0gTanDQ5ywAe4",
  authDomain: "ai-on-hompage.firebaseapp.com",
  projectId: "ai-on-hompage",
  storageBucket: "ai-on-hompage.firebasestorage.app",
  messagingSenderId: "125679313264",
  appId: "1:125679313264:web:8669c6699d141e6c268846"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;