import { Quote } from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Keep testimonials separate from the markup — adding, removing, or
// reordering a client quote later means editing this array only.
// ---------------------------------------------------------------
const testimonials = [
  {
    id: 1,
    name: "Michael Anderson",
    role: "Profession",
    quote:
      "The Information Technology (IT) field encompasses a wide range of professions and career opportunities. IT professionals work with technology systems and software to design, develop, manage, and maintain various aspects of computing and information systems.",
    avatar: "https://i.pravatar.cc/80?img=13",
  },
  {
    id: 2,
    name: "Emily Davis",
    role: "Business Women",
    quote:
      '"Business women" refers to women who are actively engaged in various aspects of the business world. This can include women who are entrepreneurs, business owners, corporate executives, managers, professionals, or employees in various industries.',
    avatar: "https://i.pravatar.cc/80?img=48",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Application Development",
    quote:
      "Application development refers to the process of creating software applications for various platforms and devices, such as mobile phones, desktop computers, web browsers, and more.",
    avatar: "https://i.pravatar.cc/80?img=15",
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// One testimonial card. On a dark background, shadcn's dark-mode
// card recipe swaps a solid white fill for a faint white overlay:
// bg-white/[0.04] + a barely-there border (border-white/10). That's
// what gives the "frosted panel" look instead of a hard block
// sitting on top of the navy.
//
// hover:-translate-y-1 + transition-all is the whole animation: the
// card lifts slightly and its border brightens on mouse-over.
// ---------------------------------------------------------------
function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]">
      {/* Quote icon — purely decorative, tells the eye "this is a
          quote" before you even read the text. aria-hidden hides it
          from screen readers since it carries no real information. */}
      <Quote
        aria-hidden="true"
        className="h-6 w-6 rotate-180 text-blue-400/40"
      />

      <p className="text-sm leading-relaxed text-slate-400">{quote}</p>

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
//   1. Heading + description — plain page background, outside the
//      navy box. Multiple testimonial cards sit below it, so it
//      follows the same "heading outside the box" rule used on the
//      Services, Contact, and Team sections.
//   2. The navy box — holds only the 3 testimonial cards.
//
// No horizontal padding, max-width, or mx-auto is set here, and no
// vertical margin either — the root layout already wraps every page
// in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so repeating any of
// that in this component would double it up. Only spacing *inside*
// the box (p-6/p-8/p-10) and the gap before it (mt-10) remain, since
// those belong to this component regardless of which page it's on.
// ---------------------------------------------------------------
export default function Testimonials() {
  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION — outside the box ---------- */}
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

      {/* ---------- THE BOX — dark navy background ---------- */}
      <div
        className="mt-10 overflow-hidden rounded-3xl sm:mt-12"
        style={{ backgroundColor: "#0A2239" }}
      >
        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
