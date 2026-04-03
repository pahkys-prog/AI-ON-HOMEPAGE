import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "./store/useAuthStore";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Router from "./shared/Router"; // 👈 새로 만든 라우터를 불러옵니다.
import { ModalProvider } from "./contexts/ModalContext";
import "./index.css";
import "./App.css";

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
    <ModalProvider>
      <>
        <div className="app">
          <ScrollToTop />
          <Header />
          <main>
            <Router />
          </main>

          <Footer />
        </div>
      </>
    </ModalProvider>
  );
}

export default App;
