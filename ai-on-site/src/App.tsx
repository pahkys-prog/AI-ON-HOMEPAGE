import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Banner from "./components/Banner/Banner";
import About from "./components/About/About";
import Business from "./components/Business/Business"; // ✅ 이름을 Business로 변경!
import Contact from "./components/Contact/Contact";
import QnA from "./components/QnA/QnA";
import Gallery from "./components/Gallery/Gallery";
import AboutDetail from "./pages/AboutDetail";
import Footer from "./components/Footer/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ContactForm from "./components/Contact/ContactForm";
import ContactList from "./components/Contact/ContactList";
import GalleryArt from "./pages/GalleryArt";
import GalleryMovie from "./pages/GalleryMovie.tsx"; // .tsx 추가
import GalleryEdu from "./pages/GalleryEdu.tsx"; // .tsx 추가
import Copyright from "./pages/Copyright.tsx";
import ScrollToTop from "./components/ScrollToTop";
// App.tsx 상단에 추가
import { useEffect } from "react";
import { onAuthStateChanged} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Firestore에서 유저 권한(role) 가져오기
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        let userRole = "user"; // 기본값
        
        if (userDoc.exists()) {
          userRole = userDoc.data().role;
        }
        
        // Zustand 스토어에 저장 (이제 전역에서 사용 가능!)
        setUser(currentUser, userRole);
      } else {
        clearAuth();
      }
    });
    
    return () => unsubscribe();
  }, [setUser, clearAuth]);

  return (
    // ✅ Router(BrowserRouter)가 Routes 전체를 감싸고 있어야 페이지 이동이 작동합니다.
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* 메인 페이지 (스크롤해서 보는 전체 섹션) */}
        <Route
          path="/"
          element={
            <>
              <Banner />
              <div className="container">
                <About />
                <Business />
                <QnA />
                <Contact />
                <Gallery /> {/* 메인에 포함된 갤러리 섹션 */}
              </div>
            </>
          }
        />

        {/* 독립된 갤러리 상세 페이지들 - 이 순서가 중요합니다! */}
        {/* 절대 경로로 확실하게 잡아줍니다. */}
        <Route path="/gallery/art" element={<GalleryArt />} />
        <Route path="/gallery/movie" element={<GalleryMovie />} />
        <Route path="/gallery/edu" element={<GalleryEdu />} />

        {/* 나머지 페이지들 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-detail" element={<AboutDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/admin/contacts" element={<ContactList />} />
        <Route path="/about" element={<About />} />
        <Route path="/business" element={<Business />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/copyright" element={<Copyright />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
