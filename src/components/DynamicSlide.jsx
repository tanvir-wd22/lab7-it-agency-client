import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const DynamicSlide = ({ image, heading, description }) => {
  return (
    <section className="relative isolate h-[70vh] min-h-[440px] overflow-hidden rounded-2xl sm:h-[75vh] sm:min-h-[520px] lg:h-[75vh]">
      {/* Background */}
      <motion.img
        src={image}
        alt={heading}
        className="absolute inset-0 size-full object-cover"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

      {/* Decorative Blur */}
      <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          variants={containerVariants}
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {heading}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/70 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl"
          >
            {description}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-white px-6 font-medium text-black transition-colors sm:h-11 sm:w-auto"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:h-11 sm:w-auto"
            >
              View Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-white/70 sm:mt-16 sm:gap-8"
          >
            <motion.div variants={statVariants}>
              <p className="text-xl font-semibold text-white sm:text-2xl">10K+</p>
              <p className="text-xs sm:text-sm">Active Users</p>
            </motion.div>

            <div className="h-8 w-px bg-white/20" />

            <motion.div variants={statVariants}>
              <p className="text-xl font-semibold text-white sm:text-2xl">99.9%</p>
              <p className="text-xs sm:text-sm">Uptime</p>
            </motion.div>

            <div className="h-8 w-px bg-white/20" />

            <motion.div variants={statVariants}>
              <p className="text-xl font-semibold text-white sm:text-2xl">24/7</p>
              <p className="text-xs sm:text-sm">Support</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent sm:h-40" />
    </section>
  );
};

export default DynamicSlide;