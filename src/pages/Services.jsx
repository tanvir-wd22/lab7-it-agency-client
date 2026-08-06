import { motion } from "motion/react";
import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../data/servicesData";
import Heading from "../components/Heading";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/*
        Gradient-ring border.
        `--gradient-angle` is animated so the conic-gradient itself spins in
        place — the element that holds it never rotates or resizes.
        The ring shape comes from mask-composite: exclude (content-box vs
        padding-box), not from clipping an oversized square, so every edge
        — including the left, at any card aspect ratio — is guaranteed
        full coverage.
      */}
      <style>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-gradient-angle {
          to { --gradient-angle: 360deg; }
        }
        .service-card-ring {
          background: conic-gradient(
            from var(--gradient-angle),
            var(--color-primary),
            var(--color-secondary),
            var(--color-accent),
            var(--color-primary)
          );
          animation: spin-gradient-angle 3s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-card-ring { animation: none; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-3xl"
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-6 max-w-2xl space-y-4"
      >
        <Heading
          title="Real problems, real outcomes."
          description="We don't showcase logos — we showcase results."
        />
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto block h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {servicesData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className="group relative h-full"
          >
            {/* Base card surface — the actual card. Thin border + soft
                shadow, shadcn-style, no filled background panel. */}
            <div
              className="
                relative h-full overflow-hidden rounded-2xl
                border border-base-300 bg-base-100
                shadow-sm
                transition-shadow duration-300
                group-hover:shadow-xl group-hover:shadow-primary/5
              "
            >
              <ServiceCard item={item} />
            </div>

            {/* Gradient ring — sits on top, exact 1px ring via mask,
                fades in on hover. Cannot leave a gap on any edge. */}
            <div
              aria-hidden="true"
              className="
                service-card-ring
                pointer-events-none absolute inset-0 rounded-2xl p-px
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              "
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;