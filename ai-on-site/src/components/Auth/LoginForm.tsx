import { auth } from "../../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("로그인 성공!");
  } catch (error) {
    alert("로그인에 실패했습니다.");
  }
};