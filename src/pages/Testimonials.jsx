import { motion } from "motion/react";
import {
  Sparkles,
  Zap,
  Orbit,
  Waves,
  Flame,
  Leaf,
  Compass,
  Gem,
} from "lucide-react";
import Heading from "../components/Heading";

// Static class strings (not template-built) so Tailwind's JIT scanner
// picks them up — dynamic `bg-${color}/15` strings would be invisible to it.
const colorMap = {
  primary: "bg-primary/15",
  secondary: "bg-secondary/15",
  accent: "bg-accent/15",
  info: "bg-info/15",
  warning: "bg-warning/15",
  success: "bg-success/15",
};

const testimonials = [
  {
    name: "Brad Hanna",
    handle: "@Marko",
    company: "Nimbus",
    icon: Sparkles,
    color: "secondary",
    quote:
      "Studio has improved my workflow. The components are appealing and perform well right out of the box.",
  },
  {
    name: "Brad Hanna",
    handle: "@Marko",
    company: "Orbital",
    icon: Orbit,
    color: "success",
    quote:
      "Using Studio has made my projects intuitive and efficient. The documentation is clear and thorough.",
  },
  {
    name: "Brad Hanna",
    handle: "@Marko",
    company: "Flux",
    icon: Zap,
    color: "info",
    quote:
      "The community around Studio is fantastic! I've received support, making my experience so much smoother.",
  },
  {
    name: "Ella Johnson",
    handle: "@EllaJ",
    company: "Verve",
    icon: Flame,
    color: "warning",
    quote:
      "Using Studio has made my projects more efficient, with clear documentation and a great component set.",
  },
  {
    name: "Marcus Lee",
    handle: "@mlee",
    company: "Solace",
    icon: Waves,
    color: "accent",
    quote:
      "The build quality is outstanding. Every component just works, and the theming system saved us weeks.",
  },
  {
    name: "Priya Nair",
    handle: "@priyan",
    company: "Compass",
    icon: Compass,
    color: "primary",
    quote:
      "Support response time is incredible. We shipped our redesign twice as fast using this component set.",
  },
  {
    name: "Tom Reyes",
    handle: "@treyes",
    company: "Meadow",
    icon: Leaf,
    color: "success",
    quote:
      "Clean, accessible, and genuinely well thought out. It's rare to find a kit this polished out of the box.",
  },
  {
    name: "Aiko Sato",
    handle: "@aikos",
    company: "Facet",
    icon: Gem,
    color: "secondary",
    quote:
      "The attention to detail in every state — hover, focus, loading — is what sold the whole team on this.",
  },
];

const TestimonialCard = ({ item }) => {
  const Icon = item.icon;
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    item.name
  )}&backgroundType=solid`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="w-[280px] shrink-0 px-3 sm:w-[300px]"
    >
      {/* Colored panel: logo + speech bubble */}
      <div
        className={`relative rounded-2xl border border-base-300/50 p-5 pb-6 ${colorMap[item.color]}`}
      >
        <div className="flex items-center gap-2 text-base-content">
          <Icon size={20} strokeWidth={2.25} />
          <span className="text-base font-bold tracking-tight">
            {item.company}
          </span>
        </div>

        <div className="relative mt-5 rounded-xl bg-neutral p-4 text-sm leading-6 text-neutral-content shadow-sm">
          {item.quote}
          {/* Speech-bubble tail */}
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 rounded-[3px] bg-neutral"
          />
        </div>
      </div>

      {/* Avatar row — sits below the colored panel, on the page background */}
      <div className="mt-5 flex items-center gap-3 px-1">
        <img
          src={avatarUrl}
          alt={item.name}
          className="h-9 w-9 shrink-0 rounded-full border border-base-300 bg-base-200"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-base-content">
            {item.name}
          </p>
          <p className="truncate text-xs text-base-content/45">
            {item.handle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  // Duplicated once so the CSS loop from 0% to -50% is seamless.
  const track = [...testimonials, ...testimonials];

  return (
    <section className="relative w-full overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 38s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl px-4 text-center sm:text-left"
      >
        <Heading
          title="Success Speaks For Itself"
          description="Predictive analytics has really made our processes smoother and boosted our business results a ton!"
        />
      </motion.div>

      {/* Marquee — edge-fade mask is the premium touch that keeps the
          cutoff cards from looking abrupt at the container edges. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max py-2">
          {track.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;