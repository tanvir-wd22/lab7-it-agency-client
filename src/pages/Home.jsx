import Carousel from "../components/Carousel";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Services from "./Services";
import Testimonials from "./Testimonials";

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
      <div className="mb-8 lg:mb-16">
        <Contact></Contact>
      </div>
      <div>
        <Testimonials></Testimonials>
      </div>
    </div>
  );
};

export default Home;
