import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Code2,
  Database,
  CloudCog,
  GitBranch,
  TerminalSquare,
  Boxes,
  Globe2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

// ---- Data ---------------------------------------------------------------

const innerRingIcons = [Code2, TerminalSquare, GitBranch, ShieldCheck];
const outerRingIcons = [Database, Globe2, CloudCog, Boxes];

// Percentage-based circular layout. `radius` (0–50) controls how far from
// center the ring sits, so two rings with different radii are genuinely
// concentric instead of stacking on the same circle.
const buildRingPositions = (count, radius, offsetDeg = 0) =>
  Array.from({ length: count }, (_, i) => {
    const angle = ((360 / count) * i + offsetDeg) * (Math.PI / 180);
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });

// ---- Motion variants ------------------------------------------------------

const titleStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// -------------------------------------------------------------------------

// Floating stat card — continuous float + breathing glow, shimmer sweep
// and stronger glow + tilt on hover. Positioned fully outside the orbit.
const FloatingCard = ({ className, delay, floatOffset = [0, -10, 0], children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 24 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
    className={`absolute z-20 hidden sm:block ${className}`}
  >
    <motion.div
      animate={{ y: floatOffset }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      className="relative"
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="absolute -inset-2 -z-10 rounded-3xl bg-primary/20 blur-xl"
      />

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: -2,
          boxShadow: "0 0 40px -6px var(--color-primary)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="group/card relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/90 p-4 shadow-lg backdrop-blur-sm"
      >
        <motion.span
          aria-hidden="true"
          initial={{ x: "-120%" }}
          whileHover={{ x: "120%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-base-content/10 to-transparent"
        />
        {children}
      </motion.div>
    </motion.div>
  </motion.div>
);

// One orbiting ring of icon "moons". The ring spins; each icon counter-
// rotates the same amount so it stays upright while tracing the orbit.
const OrbitRing = ({ icons, positions, duration, direction, cardSize, iconSize }) => (
  <motion.div
    className="absolute inset-0"
    style={{ transformOrigin: "50% 50%" }}
    animate={{ rotate: direction * 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    {icons.map((Icon, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${positions[i].x}%`,
          top: `${positions[i].y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: direction * -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            whileHover={{ scale: 1.28, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className={`
              group/node relative flex items-center justify-center rounded-2xl
              bg-base-100 text-base-content/55 shadow-sm
              transition-[color,box-shadow] duration-300
              hover:text-primary hover:shadow-[0_0_32px_-4px_var(--color-primary)]
              ${cardSize}
            `}
          >
            <Icon size={iconSize} strokeWidth={2} />
            {/* Always-on spinning gradient border */}
            <span
              aria-hidden="true"
              className="snake-ring pointer-events-none absolute inset-0 rounded-2xl p-[1.5px]"
            />
          </motion.div>
        </motion.div>
      </div>
    ))}
  </motion.div>
);

const Banner = () => {
  // Two genuinely distinct radii — inner ring at 30%, outer ring at 48%
  // (container's edge) — so both rings are visible as separate orbits.
  const innerPositions = useMemo(() => buildRingPositions(4, 30, -45), []);
  const outerPositions = useMemo(() => buildRingPositions(4, 48, 0), []);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 sm:py-20">
      <style>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-gradient-angle {
          to { --gradient-angle: 360deg; }
        }
        .snake-ring {
          background: conic-gradient(
            from var(--gradient-angle),
            var(--color-primary),
            var(--color-secondary),
            var(--color-accent),
            var(--color-primary)
          );
          animation: spin-gradient-angle 3.5s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        @media (prefers-reduced-motion: reduce) {
          .snake-ring { animation: none; }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Orbit system — the whole section's focus. Title now lives in a
          round panel at dead center; both rings orbit around it; stat
          cards sit fully outside the outer ring. */}
      <div className="relative mx-auto flex items-center justify-center">
        <div className="relative aspect-square w-72 sm:w-[440px] md:w-[520px] lg:w-[600px]">
          {/* Breathing glow halo behind the whole orbit */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.92, 1, 0.92] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 -z-10 rounded-full bg-primary/20 blur-3xl"
          />

          {/* Static faint orbit-path guides, matched to real ring radii */}
          <div
            aria-hidden="true"
            className="absolute rounded-full border border-dashed border-base-content/10"
            style={{ inset: "20%" }}
          />
          <div
            aria-hidden="true"
            className="absolute rounded-full border border-dashed border-base-content/10"
            style={{ inset: "2%" }}
          />

          <OrbitRing
            icons={innerRingIcons}
            positions={innerPositions}
            duration={20}
            direction={1}
            cardSize="h-12 w-12 sm:h-14 sm:w-14"
            iconSize={20}
          />
          <OrbitRing
            icons={outerRingIcons}
            positions={outerPositions}
            duration={32}
            direction={-1}
            cardSize="h-14 w-14 sm:h-16 sm:w-16"
            iconSize={24}
          />

          {/* Round title panel — the "planet" at the center, orbited by
              both rings. Stays fixed, doesn't rotate. */}
          <motion.div
            variants={titleStagger}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-2xl"
            />
            <div className="relative flex aspect-square w-40 items-center justify-center rounded-full bg-base-100 p-px shadow-xl sm:w-52 md:w-60">
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-full bg-base-100 px-5 text-center">
                <motion.h1
                  variants={fadeUp}
                  className="text-base font-bold leading-tight tracking-tight text-base-content sm:text-lg md:text-xl"
                >
                  Innovative{" "}
                  <span className="inline-block rounded-full border border-base-300 bg-base-200 px-2.5 py-0.5 text-[0.85em] transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10">
                    Solutions
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="text-[11px] font-medium leading-snug text-base-content/50 sm:text-xs"
                >
                  Scalable engineering to grow your business 🚀
                </motion.p>
              </div>
              {/* Always-on spinning gradient border, round to match the panel */}
              <div
                aria-hidden="true"
                className="snake-ring pointer-events-none absolute inset-0 rounded-full p-[2px]"
              />
            </div>
          </motion.div>

          {/* Stat cards — anchored outside the outer ring's radius so
              they never overlap the orbiting icons. */}
          <FloatingCard
            className="-left-6 top-[6%] w-40 -rotate-6 sm:-left-16 sm:top-[10%] sm:w-44"
            delay={0.6}
          >
            <p className="text-[11px] font-medium text-base-content/45">
              Sprint Velocity
            </p>
            <p className="mt-1 text-2xl font-bold text-base-content">82%</p>
            <svg viewBox="0 0 100 30" className="mt-2 h-8 w-full">
              <path
                d="M0 22 L14 16 L28 20 L42 8 L56 14 L70 6 L84 12 L100 4"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-success">
              <ArrowUpRight size={12} /> 24% this week
            </p>
          </FloatingCard>

          <FloatingCard
            className="-right-6 bottom-[6%] w-44 rotate-6 sm:-right-16 sm:bottom-[10%] sm:w-48"
            delay={0.75}
            floatOffset={[0, -8, 0]}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium text-base-content/45">
                Project Overview
              </p>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
                +18.2%
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold text-base-content">$38.5k</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-base-200/70 p-2 transition-colors duration-200 group-hover/card:bg-base-200">
                <p className="text-[10px] text-base-content/45">Delivered</p>
                <p className="text-xs font-semibold text-base-content">62.2%</p>
              </div>
              <div className="rounded-lg bg-base-200/70 p-2 transition-colors duration-200 group-hover/card:bg-base-200">
                <p className="text-[10px] text-base-content/45">On Track</p>
                <p className="text-xs font-semibold text-base-content">92.5%</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default Banner;