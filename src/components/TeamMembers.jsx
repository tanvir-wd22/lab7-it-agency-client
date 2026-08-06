
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
 * ABOUT US — BENTO GRID
 * -----------------------
 * Inspired by dark "glass card" bento layouts (checklist card, schedule
 * card, big stat circle, chat card, notes card, avatar-cluster card,
 * nested-project card) — reworked here as an About Us page.
 *
 * Page background is light. Every card is a small dark "island" with its
 * own soft glow, similar to a premium shadcn/ui marketing page.
 *
 * Written to stay easy to read for beginners:
 *  - Content for each mock (checklist, chat, docs, team cards) is a small
 *    array right above where it's used — edit those to change the copy.
 *  - No state, no extra logic, just JSX + Tailwind classes.
 *  - Every card is a single self-contained block with a comment above it.
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
// Component
// ---------------------------------------------------------------------------

export default function TeamMembers() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Load two fonts: bold display face for the headline, regular
          body face for everything else. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="font-body">
        {/* =================================================================
            HEADLINE
        ================================================================= */}
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-24">
          <h1 className="font-display text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
            About Orbit
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            We build the office your team never has to commute to. Today,
            Orbit is home to thousands of remote teams around the world —
            soon, Orbit AI will make it the smartest room in the building too.
          </p>
        </div>

        {/* =================================================================
            BENTO GRID — ROW 1
        ================================================================= */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* --- Card A: Our approach (checklist mock) --- */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
              <h3 className="relative text-base font-semibold text-white">
                Our approach.{" "}
                <span className="font-normal text-zinc-400">
                  Plan carefully, ship every week.
                </span>
              </h3>
              <div className="relative mt-6 space-y-2">
                {APPROACH_STEPS.map((step) => (
                  <div
                    key={step.label}
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
                  </div>
                ))}
              </div>
            </div>

            {/* --- Card B: Our roadmap (schedule mock) --- */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
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
                <div className="mt-3 flex items-center -space-x-2">
                  <div className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-sky-500 to-blue-600" />
                  <div className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-amber-500 to-orange-600" />
                  <div className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-emerald-500 to-teal-600" />
                  <span className="ml-3 text-xs text-zinc-500">+2</span>
                </div>
              </div>
            </div>

            {/* --- Card C: big stat circle --- */}
            <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-950 p-6">
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5), transparent 60%)",
                }}
              />
              <span className="font-display relative text-6xl font-bold leading-none text-white">
                48
              </span>
              <span className="relative mt-2 text-sm text-zinc-400">
                Teammates
              </span>
              <button className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-950 transition hover:bg-zinc-200">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* --- Card D: Talk to us (chat mock) --- */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h3 className="text-base font-semibold text-white">
                Talk to us.{" "}
                <span className="font-normal text-zinc-400">
                  Ask us anything, anytime.
                </span>
              </h3>
              <div className="mt-6 space-y-2">
                <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-sky-500 px-3 py-2 text-xs text-white">
                  Are you hiring designers?
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600" />
                  <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-xs text-zinc-200">
                    Yes! Check our careers page 👋
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-500">
                Type a message...
                <Send className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            BENTO GRID — ROW 2
        ================================================================= */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* --- Card E: Our docs (notes mock) --- */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h3 className="text-base font-semibold text-white">
                Our docs.{" "}
                <span className="font-normal text-zinc-400">
                  Everything is written down.
                </span>
              </h3>
              <div className="mt-6 space-y-3">
                {DOCS.map((doc) => (
                  <div key={doc.title} className="flex items-center gap-3">
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
                  </div>
                ))}
              </div>
            </div>

            {/* --- Card F: Always in sync (avatar cluster + mic) --- */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 lg:col-span-2">
              <h3 className="text-base font-semibold text-white">
                Always in sync.{" "}
                <span className="font-normal text-zinc-400">
                  We meet daily, wherever we are.
                </span>
              </h3>

              <div className="relative mt-8 flex h-32 items-center justify-center">
                <div className="pointer-events-none absolute h-28 w-28 rounded-full bg-sky-500/25 blur-2xl" />

                {/* scattered "blank" teammates around the center */}
                <div className="absolute left-4 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-70">
                  <User className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="absolute right-6 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <User className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="absolute bottom-2 left-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <User className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="absolute bottom-0 right-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-70">
                  <User className="h-4 w-4 text-zinc-400" />
                </div>

                {/* center mic bubble */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <Mic className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* --- Card G: Meet the teams (nested project cards) --- */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <h3 className="relative text-base font-semibold text-white">
                Meet the teams.{" "}
                <span className="font-normal text-zinc-400">
                  Small groups, clear owners.
                </span>
              </h3>

              <div className="relative mt-8">
                {/* card peeking out behind */}
                <div className="absolute -right-2 -top-3 w-4/5 -rotate-3 rounded-xl border border-white/10 bg-zinc-900/70 p-3 opacity-70">
                  <p className="truncate text-xs font-medium text-zinc-300">
                    {TEAMS[1].name}
                  </p>
                </div>

                {/* front card */}
                <div className="relative w-4/5 rounded-xl border border-white/10 bg-zinc-900 p-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}