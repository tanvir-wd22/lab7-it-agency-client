import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";

const Services = () => {
  return (
    <div>
      <h1 className="mx-auto max-w-3xl mb-4 text-balance text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        Custom IT Solutions <br className="hidden sm:block" /> for Your
        Successful Business
      </h1>

      <p className="mx-auto mb-4 max-w-2xl text-balance text-center text-base leading-relaxed text-slate-500 sm:mt-5 sm:text-lg md:text-xl">
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
