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
// Each card now carries the navy (#0A2239) background itself,
// instead of the whole grid sitting on one shared navy panel.
// That's what makes the gaps between cards read as "blank" — the
// page background shows through the gutters, and only the card
// footprint is navy.
//
// The shadcn "Card" recipe is: rounded-xl border + a soft shadow
// that lifts it off the page (shadow-sm at rest, shadow-md on
// hover), rather than relying on a lighter overlay fill for depth.
// border-white/10 keeps a hairline edge visible against the navy
// so the card doesn't merge into a dark page background.
// ---------------------------------------------------------------
function TeamCard({ member }) {
  return (
    <div
      className="group overflow-hidden rounded-xl border border-white/10 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-md"
      style={{ backgroundColor: "#0A2239" }}
    >
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
//   1. Heading + description — plain page background.
//   2. The grid — no shared navy panel anymore. Each TeamCard
//      brings its own navy background, so the gap-6 gutters between
//      cards show the page background instead of navy.
//
// No horizontal padding, max-width, or mx-auto is set here, and no
// vertical margin either — the root layout already wraps every page
// in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so repeating any of
// that in this component would double it up.
// ---------------------------------------------------------------
export default function TeamMembers() {
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
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}