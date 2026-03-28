import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 경로(pathname)가 바뀔 때마다 스크롤을 0,0(최상단)으로 옮깁니다.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}