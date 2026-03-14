import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;