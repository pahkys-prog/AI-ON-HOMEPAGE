import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import welcomeImg from "../assets/images/welcome.png";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
      }}
    >
      <motion.img
        src={welcomeImg}
        style={{ width: "400px" }}
        initial={{ opacity: 1, x: 0, y: 0 }}
        animate={{ opacity: 0, x: 400, y: -300 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}