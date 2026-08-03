import { Quote } from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Keep testimonials separate from the markup — adding, removing, or
// reordering a client quote later means editing this array only.
// `featured` marks the middle card so it can get its own background
// and slightly larger footprint without hardcoding "the 2nd item"
// logic into the JSX below.
// ---------------------------------------------------------------
const testimonials = [
  {
    id: 1,
    name: "Michael Anderson",
    role: "Profession",
    quote:
      "The Information Technology (IT) field encompasses a wide range of professions and career opportunities. IT professionals work with technology systems and software to design, develop, manage, and maintain various aspects of computing and information systems.",
    avatar: "https://i.pravatar.cc/80?img=13",
    featured: false,
  },
  {
    id: 2,
    name: "Emily Davis",
    role: "Business Women",
    quote:
      '"Business women" refers to women who are actively engaged in various aspects of the business world. This can include women who are entrepreneurs, business owners, corporate executives, managers, professionals, or employees in various industries.',
    avatar: "https://i.pravatar.cc/80?img=48",
    featured: true,
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Application Development",
    quote:
      "Application development refers to the process of creating software applications for various platforms and devices, such as mobile phones, desktop computers, web browsers, and more.",
    avatar: "https://i.pravatar.cc/80?img=15",
    featured: false,
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// Each card now carries its own navy background (#0A2239), like the
// Team and Contact cards — so the gaps between the 3 cards show the
// page background, not one shared panel.
//
// The featured (middle) card gets a lighter navy — #123A5E, a step
// up in lightness from the same navy family rather than a clashing
// color — so it reads as "the same palette, promoted" next to its
// two neighbors. It also sits a bit taller (extra padding + a small
// negative top margin on larger screens) and picks up a bolder
// border/shadow so it visually leads the row.
//
// Shadcn's card recipe drives the depth here: a hairline border plus
// real elevation (shadow-sm at rest, shadow-md/lg on hover) instead
// of a lighter fill doing the work of separating card from page.
// ---------------------------------------------------------------
function TestimonialCard({ name, role, quote, avatar, featured }) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 ${
        featured
          ? "border-blue-400/40 p-7 shadow-md hover:border-blue-400/60 hover:shadow-lg lg:-mt-4 lg:mb-4"
          : "border-white/10 hover:border-blue-400/30 hover:shadow-md"
      }`}
      style={{ backgroundColor: featured ? "#123A5E" : "#0A2239" }}
    >
      {/* Quote icon — purely decorative, tells the eye "this is a
          quote" before you even read the text. aria-hidden hides it
          from screen readers since it carries no real information. */}
      <Quote
        aria-hidden="true"
        className={`h-6 w-6 rotate-180 ${
          featured ? "text-blue-300/50" : "text-blue-400/40"
        }`}
      />

      <p className="text-sm leading-relaxed text-slate-300">{quote}</p>

      <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
        <img
          src={avatar}
          alt={name}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-blue-400">{name}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Structure, top to bottom:
//   1. Heading + description — plain page background.
//   2. The grid — no shared navy panel anymore. Each card brings its
//      own background (see TestimonialCard), so the gap-6 gutters
//      between them show the page background instead of navy.
//
// No horizontal padding, max-width, or mx-auto is set here, and no
// vertical margin either — the root layout already wraps every page
// in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so repeating any of
// that in this component would double it up.
// ---------------------------------------------------------------
export default function Testimonials() {
  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION ---------- */}
      <div className="mx-auto max-w-2xl space-y-4 mb-6">
        <h2 className="text-balance text-center text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Build faster with trusted IT experts
        </h2>

        <p className="mx-auto text-justify text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          From cloud infrastructure to custom software, we partner with growing
          teams to ship reliable technology that scales with your business.
        </p>

        <span className="mx-auto block h-1 w-10 rounded-full bg-blue-500" />
      </div>

      {/* ---------- GRID — no shared panel, gaps stay blank ---------- */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:items-center">
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
