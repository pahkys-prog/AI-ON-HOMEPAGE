import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // 🌟 Firebase가 "이 사람 로그인 했어!"라고 확답 줄 때까지 기다립니다.
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>잠시만 기다려주세요... (로딩 중)</div>;

  if (!user) {
    alert("로그인이 필요한 페이지입니다!");
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
};