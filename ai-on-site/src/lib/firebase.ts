import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {

  apiKey: "AIzaSyAUJOMiDB2DW5FamQLOyi0gTanDQ5ywAe4",
  authDomain: "ai-on-hompage.firebaseapp.com",
  projectId: "ai-on-hompage",
  storageBucket: "ai-on-hompage.firebasestorage.app",
  messagingSenderId: "509203699113",
  appId: "1:509203699113:web:17dcd825cd8c4ccfb420b8",
  measurementId: "G-PMN5SSWYG1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)