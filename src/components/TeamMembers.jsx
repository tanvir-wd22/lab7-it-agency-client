// ---------------------------------------------------------------
// 1. DATA
// Keep the team list separate from the markup — adding or removing
// a person later means editing this array only.
// ---------------------------------------------------------------
const team = [
  {
    id: 1,
    name: "Alex Taylor",
    role: "Engineer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Lisa Patel",
    role: "Professor",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rachel Taylor",
    role: "Scientist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// On a dark background, shadcn's dark-mode card recipe swaps a solid
// white fill for a faint white overlay: bg-white/[0.04] + a barely-
// there border (border-white/10). That's what gives the "frosted
// panel" look instead of a hard block sitting on top of the navy.
//
// hover:-translate-y-1 + transition-all is the animation: the whole
// card lifts slightly and its border brightens on mouse-over, while
// the photo inside zooms in a touch (group-hover on the image).
// ---------------------------------------------------------------
function TeamCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07]">
      <div className="aspect-square w-full overflow-hidden bg-white/5">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="text-sm font-semibold text-white">{member.name}</p>
        <p className="mt-0.5 text-sm text-slate-400">{member.role}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Structure, top to bottom:
//   1. Heading + description — plain page background, outside the
//      navy box. Multiple team cards sit below it, so it follows
//      the same "heading outside the box" rule used on the Services
//      and Contact sections.
//   2. The navy box — unchanged background color, holds only the
//      team grid now.
//
// No horizontal padding, max-width, or mx-auto is set here, and no
// vertical margin either — the root layout already wraps every page
// in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so repeating any of
// that in this component would double it up. The only spacing left
// in this file is padding *inside* the navy box (p-6/p-8/p-10) and
// the gap between the heading and the box (mt-10) — both of those
// are internal to this component, not page-level layout.
// ---------------------------------------------------------------
export default function TeamMembers() {
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

      {/* ---------- THE BOX — same #0A2239 background as before ---------- */}
      <div
        className="mt-10 overflow-hidden rounded-3xl sm:mt-12"
        style={{ backgroundColor: "#0A2239" }}
      >
        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}