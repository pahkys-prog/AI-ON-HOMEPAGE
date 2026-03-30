import Banner from "../components/Banner/Banner";
import About from "../components/About/About";
import Business from "../components/Business/Business";
import QnA from "../components/QnA/QnA";
import Contact from "../components/Contact/Contact";
import Gallery from "../components/Gallery/Gallery";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <About />
        <Business />
        <Contact />
        <QnA />
        <Gallery />
      </div>
    </>
  );
};

export default Home;
