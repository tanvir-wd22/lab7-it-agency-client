import Carousel from "../components/Carousel";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Services from "./Services";

const Home = () => {
  return (
    <div className="">
      <div className="mb-8 lg:mb-16">
        <Carousel></Carousel>
      </div>
      <div className="mb-8 lg:mb-16">
        <Services></Services>
      </div>
      <div className="mb-8 lg:mb-16">
        <AboutUs></AboutUs>
      </div>
      <div>
        <Contact></Contact>
      </div>
    </div>
  );
};

export default Home;
