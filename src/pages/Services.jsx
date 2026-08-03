import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";

const Services = () => {
  return (
    <div>
      {/* ---------- HEADING + DESCRIPTION — outside the box ---------- */}
      <div className="mx-auto max-w-2xl space-y-4 mb-6">
        <h2 className="text-balance text-center text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Build faster with trusted IT experts
        </h2>

        <p className="mx-auto text-justify text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          From cloud infrastructure to custom software, we partner with growing
          teams to ship reliable technology that scales with your business.
        </p>

        <span className="mx-auto block h-1 w-10 rounded-full bg-blue-500" />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((item) => (
          <ServiceCard item={item} key={item?.id}></ServiceCard>
        ))}
      </div>

     
    </div>
  );
};

export default Services;
