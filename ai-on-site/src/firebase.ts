import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUJOMiDB2DW5FamQLOyi0gTanDQ5ywAe4",
  authDomain: "ai-on-hompage.firebaseapp.com",
  projectId: "ai-on-hompage",
  storageBucket: "ai-on-hompage.firebasestorage.app",
  messagingSenderId: "125679313264",
  appId: "1:125679313264:web:8669c6699d141e6c268846"
};

// ✅ 이미 앱이 실행 중이면 기존 것을 쓰고, 없으면 새로 만듭니다 (중복 방지)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 도구들 내보내기
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();