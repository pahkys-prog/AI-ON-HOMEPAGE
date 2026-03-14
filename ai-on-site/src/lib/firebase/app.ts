import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {

  apiKey: "여기",
  authDomain: "여기",
  projectId: "여기",
  storageBucket: "여기",
  messagingSenderId: "여기",
  appId: "여기"

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)