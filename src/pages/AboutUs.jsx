import { ArrowRight, Star } from "lucide-react";
import TeamMembers from "../components/TeamMembers";

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

const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=5",
];

const heroImage =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop";

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
// A tiny, self-contained component for one stat. Because it takes
// props, we can reuse it 3 times instead of copy-pasting the markup.
// ---------------------------------------------------------------
function StatCard({ label, value, delta }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
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

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------------------------
export default function AboutUs() {
  return (
    <section className="w-full">
      <h1 className="text-center text-sky-500 text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
        Build faster with <br /> trusted IT experts
      </h1>

      <p className="text-center text-gray-600 text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">
        From cloud infrastructure to custom software, we partner with growing
        teams to ship reliable technology that scales with your business.
      </p>

      <div className="overflow-hidden rounded-3xl bg-blue-950">
        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2 md:items-center md:gap-10 md:p-10">
          {/* ---------- LEFT: copy + stats ---------- */}
          <div className="flex flex-col items-start">
            <span className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
              About Our Agency
            </span>

            {/* Stats — moved off the image, now a simple row on the left */}
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
                    className="h-8 w-8 rounded-full border-2 border-slate-950 object-cover"
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
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Let's Talk
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* ---------- RIGHT: plain image, no overlay clutter ---------- */}
          <div className="h-[280px] w-full overflow-hidden rounded-2xl sm:h-[360px] md:h-[420px]">
            <img
              src={heroImage}
              alt="IT agency team collaborating with a client"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="">
        <TeamMembers />
      </div>
    </section>
  );
}
