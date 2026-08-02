import { ArrowRight, Star, CheckCircle2 } from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Keeping content separate from markup makes it easy to edit later
// without touching any JSX below.
// ---------------------------------------------------------------
const stats = [
  { label: "Uptime", value: "99.9%", delta: "+2.4%" },
  { label: "Faster Deployments", value: "3.4x", delta: "+18%" },
  { label: "Client Retention", value: "94%", delta: "+11%" },
];

// New — a short feature list to fill the space the heading left
// behind, and to give the box something interactive of its own
// beyond the stats row.
const features = [
  "Dedicated engineer on every project",
  "Weekly progress updates, no chasing us",
  "Fixed-scope pricing, no surprise invoices",
];

const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=5",
];

const heroImage =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECES
//
// hover:-translate-y-1 + transition-all is the whole animation:
// on mouse-over, the card nudges up slightly. Simple, but it's what
// makes a static grid feel alive.
// ---------------------------------------------------------------
function StatCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.08]">
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <p className="text-lg font-semibold tracking-tight text-white">
          {value}
        </p>
        <span className="text-[10px] font-semibold text-emerald-400">
          {delta}
        </span>
      </div>
    </div>
  );
}

// One feature row — icon nudges right and brightens on hover, so the
// list feels responsive to the cursor instead of sitting static.
function FeatureRow({ text }) {
  return (
    <li className="group flex items-center gap-2.5 text-sm text-slate-300 transition-colors duration-200 hover:text-white">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 transition-transform duration-200 group-hover:translate-x-0.5" />
      {text}
    </li>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Structure, top to bottom:
//   1. Heading + description — plain page background, outside the
//      navy box, following the same "heading outside the box" rule
//      used on the Services, Contact, and Team sections.
//   2. The navy box — unchanged background color, holds the badge,
//      a short feature list, stats, avatars/rating, and the CTA
//      button on the left, with the hero image on the right.
//
// No horizontal padding, max-width, or mx-auto is set here, and no
// vertical margin either — the root layout already wraps every page
// in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so repeating any of
// that in this component would double it up. Only spacing *inside*
// the box (p-6/p-8/p-10/p-14) and the gap before it (mt-10) remain,
// since those belong to this component regardless of which page
// it's placed on.
// ---------------------------------------------------------------
export default function CompanyInfo() {
  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION — outside the box ---------- */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          About Our Agency
        </span>

        <h2 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Build faster with trusted IT experts
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          From cloud infrastructure to custom software, we partner with
          growing teams to ship reliable technology that scales with your
          business.
        </p>

        <span className="mx-auto mt-4 block h-1 w-10 rounded-full bg-blue-500" />
      </div>

      {/* ---------- THE BOX — same #0A2239 background as before ---------- */}
      <div
        className="relative mt-10 overflow-hidden rounded-3xl sm:mt-12"
        style={{ backgroundColor: "#0A2239" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-10 md:p-10 lg:p-14">
          {/* ---------- LEFT: badge + features + stats ---------- */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              Why Teams Choose Us
            </span>

            {/* Feature list — fills the space the heading used to take,
                and gives the box its own interactive detail. */}
            <ul className="mt-5 flex flex-col gap-2.5">
              {features.map((text) => (
                <FeatureRow key={text} text={text} />
              ))}
            </ul>

            {/* Stats — a simple row instead of floating cards on the image */}
            <div className="mt-6 grid w-full grid-cols-3 gap-2.5 sm:gap-3">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Avatars + rating */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Client avatar"
                    className="h-8 w-8 rounded-full border-2 object-cover transition-transform duration-200 hover:z-10 hover:scale-110"
                    style={{ borderColor: "#0A2239" }}
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  Trusted by 500+ growing businesses
                </p>
              </div>
            </div>

            {/* "group" on the button + "group-hover" on the arrow lets the
                icon react to hovering the whole button, not just itself. */}
            <button
              type="button"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:gap-3 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2239]"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* ---------- RIGHT: image with a subtle hover zoom ---------- */}
          <div className="h-[280px] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-[360px] md:h-[420px]">
            <img
              src={heroImage}
              alt="IT agency team collaborating with a client"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}