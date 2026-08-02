import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";

const Services = () => {
  return (
    <div>
      <h1 className="text-center text-sky-500 text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
        Custom It Solutions <br /> for your successful business
      </h1>

       <p className="text-center text-gray-600 text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">
        We are a team of experienced professionals dedicated to providing the
        best IT solutions for your business.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((item) => (
          <ServiceCard item={item} key={item?.id}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
