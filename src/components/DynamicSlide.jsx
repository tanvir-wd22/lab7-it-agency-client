const DynamicSlide = ({ image, heading, description }) => {
  return (
    <section className="relative isolate min-h-screen overflow-hidden rounded-2xl">
      {/* Background */}
      <img src={image} alt={heading} className="absolute inset-0 size-full object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

      {/* Decorative Blur */}
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-xl">
            <span className="size-2 rounded-full bg-emerald-400" />
            Trusted by modern teams
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {heading}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/70 sm:text-xl">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 font-medium text-black transition-all hover:scale-[1.02]">
              Get Started
            </button>

            <button className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/20">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/70">
            <div>
              <p className="text-2xl font-semibold text-white">10K+</p>
              <p className="text-sm">Active Users</p>
            </div>

            <div className="h-8 w-px bg-white/20" />

            <div>
              <p className="text-2xl font-semibold text-white">99.9%</p>
              <p className="text-sm">Uptime</p>
            </div>

            <div className="h-8 w-px bg-white/20" />

            <div>
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p className="text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};

export default DynamicSlide;
