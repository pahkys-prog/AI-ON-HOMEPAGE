import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import GalleryArt from "../pages/GalleryArt";
import GalleryMovie from "../pages/GalleryMovie";
import GalleryEdu from "../pages/GalleryEdu";
import AboutDetail from "../pages/AboutDetail";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import ContactForm from "../components/Contact/ContactForm";
import ContactList from "../components/Contact/ContactList";
import Copyright from "../pages/Copyright";
import {ProtectedRoute} from "../components/ProtectedRoute"; 

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* 갤러리 상세 페이지들 */}
      <Route path="/gallery/art" element={<GalleryArt />} />
      <Route path="/gallery/movie" element={<GalleryMovie />} />
      <Route path="/gallery/edu" element={<GalleryEdu />} />

      {/* 회원 관련 */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* 기타 페이지 */}
      <Route path="/about-detail" element={<AboutDetail />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/copyright" element={<Copyright />} />

      {/* 로그인이 필요한 페이지 예시 (추후 ProtectedRoute로 감싸기) */}
      <Route path="/contact-form" element={<ProtectedRoute>
          <ContactForm />
        </ProtectedRoute>} />
      <Route path="/admin/contacts" element={<ContactList />} />
    </Routes>
  );
};

export default Router;