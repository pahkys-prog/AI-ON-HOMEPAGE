import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "./store/useAuthStore";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./shared/Router"; // 👈 새로 만든 라우터를 불러옵니다.

function App() {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        let userRole = "user"; 
        
        if (userDoc.exists()) {
          userRole = userDoc.data().role;
        }
        setUser(currentUser, userRole);
      } else {
        clearAuth();
      }
    });
    
    return () => unsubscribe();
  }, [setUser, clearAuth]);

  return (
    <>
      <ScrollToTop />
      <Header />
      
      {/* 알맹이(페이지)는 Router가 주소에 맞춰서 갈아 끼워줍니다. */}
      <Router /> 

      <Footer />
    </>
  );
}

export default App;