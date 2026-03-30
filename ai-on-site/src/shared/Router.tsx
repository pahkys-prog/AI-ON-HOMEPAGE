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
import About from "../components/About/About";
import Business from "../components/Business/Business";
import Gallery from "../components/Gallery/Gallery";
import Contact from "../components/Contact/Contact";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/*Header nav 관련*/}
      <Route path="/about" element={<About />} />
      <Route path="/business" element={<Business />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />

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
      <Route path="/contact-form" element={<ContactForm />} />
      <Route path="/admin/contacts" element={<ContactList />} />
    </Routes>
  );
};

export default Router;
