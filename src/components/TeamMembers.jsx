import { motion } from "motion/react";
import {
  CheckSquare,
  Square,
  Plus,
  Send,
  Mic,
  User,
  FileText,
  ListChecks,
  Link2,
  Star,
  Users,
} from "lucide-react";

/**
 * ABOUT US — BENTO GRID (premium dark-card version)
 * -----------------------------------------------------------------------
 * Same layout and content as the original: one light page, seven dark
 * "glass card" islands (checklist, roadmap, stat circle, chat, docs,
 * always-in-sync, teams).
 *
 * What changed:
 *  - No <style> tag and no custom Google Font. Everything uses Tailwind's
 *    default font stack, so there's nothing to load and nothing to break.
 *  - Every animation (entrances, hover lift, breathing glows, the mic
 *    pulse) is done with Framer Motion — there are no CSS @keyframes or
 *    `transition-*` utility classes anywhere in this file.
 *  - Cards got a slightly more "premium" finish: soft shadows, a subtle
 *    inner ring, and gentle glow blobs that slowly breathe in place.
 *
 * How the animation is organised (read this once, it explains the file):
 *  - `fadeUp` / `popIn` are reusable "variants" — just plain objects that
 *    describe a hidden state and a visible state. Motion interpolates
 *    between them for you.
 *  - `staggerParent` is put on any wrapper that should reveal its
 *    children one after another instead of all at once.
 *  - `<Glow />` is the soft blurred blob you see glowing behind content —
 *    it just fades in and out forever.
 *  - `<BentoCard />` is the shared card shell: dark background, border,
 *    shadow, and a gentle lift on hover. Every card below is built on it.
 */

// ---------------------------------------------------------------------------
// Small bits of content used inside the cards — edit these freely
// ---------------------------------------------------------------------------

const APPROACH_STEPS = [
  { label: "Discovery call", done: true },
  { label: "Kickoff workshop", done: false },
  { label: "Weekly demo", done: false },
];

const DOCS = [
  { icon: FileText, title: "Company handbook", subtitle: "How we work, in one doc" },
  { icon: ListChecks, title: "Onboarding checklist", subtitle: "Everything for week one" },
  { icon: Link2, title: "Culture doc", subtitle: "What we value, and why" },
];

const TEAMS = [
  { name: "Design", members: "6 members" },
  { name: "Engineering", members: "8 members" },
];

// ---------------------------------------------------------------------------
// Reusable animation variants — small, named building blocks
// ---------------------------------------------------------------------------

// Fades a wrapper's children in one after another instead of all at once.
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Fade up + in. Used for headline text and most cards.
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Fade + scale up. Used for small pill/avatar style elements.
const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// A chat bubble sliding in from a side. `fromRight` flips the direction.
const slideIn = (fromRight = false) => ({
  hidden: { opacity: 0, x: fromRight ? 16 : -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
});

// ---------------------------------------------------------------------------
// Small shared pieces
// ---------------------------------------------------------------------------

// A soft blurred glow blob that slowly breathes (fades in and out) forever.
// Purely decorative, so it's marked aria-hidden.
const Glow = ({ className = "" }) => (
  <motion.div
    aria-hidden="true"
    animate={{ opacity: [0.35, 0.7, 0.35] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
  />
);

// The shared dark "island" shell every card in the grid is built from.
// Handles the premium look (border, shadow, ring) and the hover lift —
// individual cards only need to supply their own inner content.
const BentoCard = ({ className = "", rounded = "rounded-3xl", children }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    className={`relative overflow-hidden ${rounded} border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 ${className}`}
  >
    {children}
  </motion.div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamMembers() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* =================================================================
          HEADLINE
      ================================================================= */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="pb-16 pt-24"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-zinc-500 shadow-sm"
        >
          ABOUT US
        </motion.span>
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl"
        >
          About Orbit
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500"
        >
          We build the office your team never has to commute to. Today,
          Orbit is home to thousands of remote teams around the world —
          soon, Orbit AI will make it the smartest room in the building too.
        </motion.p>
      </motion.div>

      {/* =================================================================
          BENTO GRID — ROW 1
      ================================================================= */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* --- Card A: Our approach (checklist mock) --- */}
        <BentoCard>
          <Glow className="-bottom-10 -left-10 h-40 w-40 bg-sky-500/20" />
          <h3 className="relative text-base font-semibold text-white">
            Our approach.{" "}
            <span className="font-normal text-zinc-400">
              Plan carefully, ship every week.
            </span>
          </h3>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mt-6 space-y-2"
          >
            {APPROACH_STEPS.map((step) => (
              <motion.div
                key={step.label}
                variants={fadeUp}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                {step.done ? (
                  <CheckSquare className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <Square className="h-4 w-4 shrink-0 text-zinc-500" />
                )}
                <span className="truncate text-sm text-zinc-300">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </BentoCard>

        {/* --- Card B: Our roadmap (schedule mock) --- */}
        <BentoCard>
          <Glow className="-bottom-10 -right-10 h-40 w-40 bg-fuchsia-500/10" />
          <h3 className="relative text-base font-semibold text-white">
            Our roadmap.{" "}
            <span className="font-normal text-zinc-400">
              Shared with the whole team, every quarter.
            </span>
          </h3>
          <div className="relative mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm font-medium text-white">
              Q3 roadmap review
            </p>
            <p className="mt-1 text-xs text-zinc-400">10:00 – 10:45am</p>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-3 flex items-center -space-x-2"
            >
              <motion.div
                variants={popIn}
                className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-sky-500 to-blue-600"
              />
              <motion.div
                variants={popIn}
                className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-amber-500 to-orange-600"
              />
              <motion.div
                variants={popIn}
                className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-emerald-500 to-teal-600"
              />
              <motion.span variants={fadeUp} className="ml-3 text-xs text-zinc-500">
                +2
              </motion.span>
            </motion.div>
          </div>
        </BentoCard>

        {/* --- Card C: big stat circle --- */}
        <BentoCard
          rounded="rounded-full"
          className="flex aspect-square flex-col items-center justify-center"
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5), transparent 60%)",
            }}
          />
          <motion.span
            variants={popIn}
            className="relative text-6xl font-bold leading-none text-white"
          >
            48
          </motion.span>
          <motion.span variants={fadeUp} className="relative mt-2 text-sm text-zinc-400">
            Teammates
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-950"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </BentoCard>

        {/* --- Card D: Talk to us (chat mock) --- */}
        <BentoCard className="flex flex-col">
          <h3 className="text-base font-semibold text-white">
            Talk to us.{" "}
            <span className="font-normal text-zinc-400">
              Ask us anything, anytime.
            </span>
          </h3>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 space-y-2"
          >
            <motion.div
              variants={slideIn(true)}
              className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-sky-500 px-3 py-2 text-xs text-white"
            >
              Are you hiring designers?
            </motion.div>
            <motion.div variants={slideIn(false)} className="flex items-start gap-2">
              <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600" />
              <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs text-zinc-200">
                Yes! Check our careers page 👋
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-500">
            Type a message...
            <Send className="h-3.5 w-3.5" />
          </div>
        </BentoCard>
      </motion.div>

      {/* =================================================================
          BENTO GRID — ROW 2
      ================================================================= */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-6 grid grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* --- Card E: Our docs (notes mock) --- */}
        <BentoCard>
          <h3 className="text-base font-semibold text-white">
            Our docs.{" "}
            <span className="font-normal text-zinc-400">
              Everything is written down.
            </span>
          </h3>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 space-y-3"
          >
            {DOCS.map((doc) => (
              <motion.div key={doc.title} variants={slideIn(false)} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
                  <doc.icon className="h-4 w-4 text-zinc-300" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {doc.title}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {doc.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </BentoCard>

        {/* --- Card F: Always in sync (avatar cluster + mic) --- */}
        <BentoCard className="lg:col-span-2">
          <h3 className="text-base font-semibold text-white">
            Always in sync.{" "}
            <span className="font-normal text-zinc-400">
              We meet daily, wherever we are.
            </span>
          </h3>

          <div className="relative mt-8 flex h-32 items-center justify-center">
            <Glow className="h-28 w-28 bg-sky-500/25" />

            {/* scattered "blank" teammates around the center, popping in
                one after another */}
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="contents"
            >
              <motion.div
                variants={popIn}
                className="absolute left-4 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-70"
              >
                <User className="h-4 w-4 text-zinc-400" />
              </motion.div>
              <motion.div
                variants={popIn}
                className="absolute right-6 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
              >
                <User className="h-4 w-4 text-zinc-400" />
              </motion.div>
              <motion.div
                variants={popIn}
                className="absolute bottom-2 left-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
              >
                <User className="h-4 w-4 text-zinc-400" />
              </motion.div>
              <motion.div
                variants={popIn}
                className="absolute bottom-0 right-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-70"
              >
                <User className="h-4 w-4 text-zinc-400" />
              </motion.div>
            </motion.div>

            {/* center mic bubble — gently pulses forever, like it's
                "listening" */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur"
            >
              <Mic className="h-6 w-6 text-white" />
            </motion.div>
          </div>
        </BentoCard>

        {/* --- Card G: Meet the teams (nested project cards) --- */}
        <BentoCard>
          <Glow className="-bottom-10 -right-10 h-40 w-40 bg-fuchsia-500/10" />
          <h3 className="relative text-base font-semibold text-white">
            Meet the teams.{" "}
            <span className="font-normal text-zinc-400">
              Small groups, clear owners.
            </span>
          </h3>

          <div className="relative mt-8">
            {/* card peeking out behind */}
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 0.7, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="absolute -right-2 -top-3 w-4/5 rounded-xl border border-white/10 bg-zinc-900/70 p-3"
            >
              <p className="truncate text-xs font-medium text-zinc-300">
                {TEAMS[1].name}
              </p>
            </motion.div>

            {/* front card — lifts and straightens slightly on hover */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, rotate: -1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-4/5 rounded-xl border border-white/10 bg-zinc-900 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">
                  {TEAMS[0].name}
                </p>
                <Star className="h-3.5 w-3.5 text-zinc-500" />
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                <Users className="h-3.5 w-3.5" />
                {TEAMS[0].members}
              </div>
            </motion.div>
          </div>
        </BentoCard>
      </motion.div>
    </div>
  );
}