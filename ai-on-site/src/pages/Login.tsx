import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Login() {

  const googleLogin = async () => {

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      alert("로그인 성공!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>로그인</h2>

      <button onClick={googleLogin}>
        Google로 로그인
      </button>

    </div>
  );
}