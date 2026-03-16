import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Banner from "./components/Banner/Banner";
import About from "./components/About/About";
import Business from "./components/Business/Business"; // ✅ 이름을 Business로 변경!
import Contact from "./components/QnA/QnA";
import Gallery from "./components/Gallery/Gallery";
import AboutDetail from './pages/AboutDetail';
import Footer from "./components/Footer/Footer";
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    // ✅ Router(BrowserRouter)가 Routes 전체를 감싸고 있어야 페이지 이동이 작동합니다.
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <div className="container">
                <About />
                <Business />
                <Contact />
                <Gallery />
              </div>
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-detail" element={<AboutDetail />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
