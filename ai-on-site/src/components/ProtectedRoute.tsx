import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuthStore(); // Zustand에서 유저 상태 가져오기

  // 만약 로그인 체크 중이라면 아무것도 안 보여주거나 로딩 스피너를 보여줍니다.

  if (!user) {
    // 로그인 안 했으면 알림창 띄우고 로그인 페이지로!
    alert("회원전용 서비스입니다. 로그인 후 이용해 주세요.");
    return <Navigate to="/login" replace />;
  }

  // 로그인 했으면 통과!
  return <>{children}</>;
};

export default ProtectedRoute;
