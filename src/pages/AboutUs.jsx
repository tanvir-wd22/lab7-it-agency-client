import { motion } from "motion/react";
import {
  CheckSquare,
  Square,
  Plus,
  Mic,
  Calendar,
  MapPin,
  Globe2,
  Star,
  Quote,
} from "lucide-react";
import Heading from "../components/Heading";

/* ============================================================================
   COLOR FIX — same pattern as the rest of the site
   ----------------------------------------------------------------------------
   The old version hard-coded `zinc-*` and `white` everywhere. Those never
   change, so switching your DaisyUI theme to "abyss" did nothing here.
   Below, structural colors are all DaisyUI tokens instead:

     base-100 / base-200 / base-300   -> background surfaces (page / card / border)
     base-content                     -> your theme's default text/ink color
     primary                          -> your theme's brand color
     success                          -> your theme's semantic "done" green

   One extra trick worth knowing: instead of `bg-white/5` for a translucent
   panel (which only looks right on dark themes), this file uses
   `bg-base-content/5`. `base-content` is already the correct "ink" color
   for whichever theme is active, so a faint tint of it reads as a subtle
   surface on light AND dark themes — no light/dark branching needed.

   The colorful avatar gradients (indigo→violet, pink→rose, etc.) are left
   untouched on purpose — they're per-person identity colors, like GitHub
   avatar colors, not part of your brand palette, so they don't need to
   move with the theme.
   ========================================================================= */

// -----------------------------------------------------------------------------
// Company data
// -----------------------------------------------------------------------------

const companyStats = [
  { icon: Calendar, label: "Founded", value: "2021" },
  { icon: MapPin, label: "HQ", value: "Remote-first" },
  { icon: Globe2, label: "Countries", value: "18+" },
  { icon: Star, label: "Client rating", value: "4.9/5" },
];

const workflow = [
  { label: "Discovery workshop", done: true },
  { label: "UI/UX strategy", done: true },
  { label: "Development sprint", done: false },
];

const teamLead = {
  initials: "AR",
  name: "Atiqur Rahman",
  role: "Founder & Lead Developer",
  quote:
    "Great products come from small teams with strong execution and clear communication.",
  gradient: "from-indigo-500 to-violet-500",
};

const team = [
  {
    initials: "SA",
    name: "Sarah Ahmed",
    role: "UI/UX Designer",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    initials: "RK",
    name: "Rakib Khan",
    role: "Frontend Engineer",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    initials: "MJ",
    name: "Mehedi Jaman",
    role: "Backend Engineer",
    gradient: "from-emerald-500 to-green-500",
  },
];

const docs = [
  {
    title: "Development handbook",
    subtitle: "Coding standards and workflow",
  },
  {
    title: "Project playbook",
    subtitle: "Delivery process and milestones",
  },
  {
    title: "Quality checklist",
    subtitle: "Testing and deployment guidelines",
  },
];

const cluster = [
  { initials: "UI", gradient: "from-teal-500 to-emerald-500" },
  { initials: "FE", gradient: "from-amber-500 to-orange-500" },
  { initials: "BE", gradient: "from-sky-500 to-blue-500" },
  { initials: "QA", gradient: "from-fuchsia-500 to-purple-500" },
];

// -----------------------------------------------------------------------------
// Framer Motion
// -----------------------------------------------------------------------------

// Parent variant: staggers its children in one after another instead of
// everything appearing at once — this is what makes a grid of cards feel
// choreographed rather than just "on/off".
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// A small scale-in on top of the fade + rise gives cards a touch more
// weight as they land — a common "premium" detail (vs. a flat fade).
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function MotionCard({ children, className = "" }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className={`group relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${className}`}
    >
      {/* Shadcn-style hairline: a faint light line along the very top edge
          of the card. Barely visible, but it's what makes a flat card feel
          like it has a physical top edge catching light. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-base-content/15 to-transparent"
      />
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function AboutUs() {
  return (
    <section className="w-full">
      <div className="font-body">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Heading
            title="Real problems, real outcomes."
            description="We don't showcase logos — we showcase results."
          />
        </motion.div>

        {/* First grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Company stats */}

          <MotionCard className="p-6">
            <h3 className="text-base font-semibold text-base-content">
              At a glance.
              <span className="font-normal text-base-content/60">
                {" "}
                The short version.
              </span>
            </h3>

            <div className="mt-6 space-y-3">
              {companyStats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>

                  <span className="text-sm font-medium text-base-content">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </MotionCard>

          {/* Workflow */}

          <MotionCard className="p-6">
            <h3 className="text-base font-semibold text-base-content">
              Our approach.
              <span className="font-normal text-base-content/60">
                {" "}
                Ship every week.
              </span>
            </h3>

            <div className="mt-6 space-y-2">
              {workflow.map((step) => (
                <motion.div
                  key={step.label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 rounded-lg border border-base-content/10 bg-base-content/5 px-3 py-2"
                >
                  {step.done ? (
                    <CheckSquare className="h-4 w-4 text-success" />
                  ) : (
                    <Square className="h-4 w-4 text-base-content/40" />
                  )}

                  <span className="text-sm text-base-content/80">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </MotionCard>

          {/* Team count */}

          <MotionCard className="flex aspect-square flex-col items-center justify-center rounded-full p-6">
            {/* A soft glow tied to your theme's primary color instead of a
                flat white glare — reads as a deliberate accent on any theme. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, color-mix(in oklch, var(--color-primary) 35%, transparent), transparent 65%)",
              }}
            />

            <motion.span
              whileHover={{ scale: 1.08 }}
              className="relative text-6xl font-bold text-base-content"
            >
              48
            </motion.span>

            <span className="relative mt-2 text-sm text-base-content/60">
              Team members
            </span>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content shadow-md shadow-primary/30"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </MotionCard>

          {/* Founder quote */}

          <MotionCard className="p-6">
            <Quote className="h-5 w-5 text-base-content/30" />

            <p className="mt-4 text-sm leading-relaxed text-base-content/80">
              "{teamLead.quote}"
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${teamLead.gradient}`}
              >
                <span className="text-xs font-semibold text-white">
                  {teamLead.initials}
                </span>
              </motion.div>

              <div>
                <p className="text-sm font-medium text-base-content">
                  {teamLead.name}
                </p>

                <p className="text-xs text-base-content/50">
                  {teamLead.role}
                </p>
              </div>
            </div>
          </MotionCard>
        </motion.div>

        {/* Second grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Docs */}

          <MotionCard className="p-6">
            <h3 className="text-base font-semibold text-base-content">
              Our documentation.
              <span className="font-normal text-base-content/60">
                {" "}
                Everything is documented.
              </span>
            </h3>

            <div className="mt-6 space-y-4">
              {docs.map((doc) => (
                <div key={doc.title}>
                  <p className="text-sm font-medium text-base-content">
                    {doc.title}
                  </p>
                  <p className="text-xs text-base-content/50">
                    {doc.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </MotionCard>

          {/* Sync */}

          <MotionCard className="p-6 lg:col-span-2">
            <h3 className="text-base font-semibold text-base-content">
              Always in sync.
              <span className="font-normal text-base-content/60">
                {" "}
                Daily collaboration across time zones.
              </span>
            </h3>

            <div className="relative mt-8 flex h-32 items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-primary/20 blur-2xl" />

              {cluster.map((person, index) => {
                const positions = [
                  "left-6 top-2",
                  "right-10 top-0",
                  "bottom-2 left-14",
                  "bottom-0 right-14",
                ];

                return (
                  <motion.div
                    key={person.initials}
                    whileHover={{ scale: 1.1 }}
                    className={`absolute ${positions[index]}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-base-200 bg-gradient-to-br ${person.gradient}`}
                    >
                      <span className="text-xs font-semibold text-white">
                        {person.initials}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-base-content/15 bg-base-100/10 backdrop-blur"
              >
                <Mic className="h-6 w-6 text-base-content" />
              </motion.div>
            </div>
          </MotionCard>

          {/* Team */}

          <MotionCard className="p-6">
            <h3 className="text-base font-semibold text-base-content">
              The team.
              <span className="font-normal text-base-content/60">
                {" "}
                Meet the people.
              </span>
            </h3>

            <div className="mt-6 space-y-4">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient}`}
                  >
                    <span className="text-[10px] font-semibold text-white">
                      {member.initials}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-base-content">
                      {member.name}
                    </p>
                    <p className="text-xs text-base-content/50">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionCard>
        </motion.div>
      </div>
    </section>
  );
}