// ---------------------------------------------------------------
// 1. DATA
// Keep the team list separate from the markup — adding or removing
// a person later means editing this array only.
// ---------------------------------------------------------------
const team = [
  {
    name: "Alex Taylor",
    role: "Engineer",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Lisa Patel",
    role: "Professor",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Rachel Taylor",
    role: "Scientist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Rachel Taylor",
    role: "Scientist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
// One card, reused once per team member via `.map()` below.
// The shadcn look = neutral border + soft shadow + rounded-xl,
// instead of bright colored backgrounds.
// ---------------------------------------------------------------
function TeamCard({ name, role, image }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="border-t border-slate-100 px-4 py-4">
        <p className="text-base font-semibold text-blue-600">{name}</p>
        <p className="mt-0.5 text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------------------------
export default function TeamMembers() {
  return (
    <section className="w-full mx-auto bg-white mt-8 sm:mt-12 lg:mt-16">
      <div className="">
        {/* Header */}
        <h1 className="text-center text-sky-500 text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
          Custom It Solutions <br /> for your successful business
        </h1>

        <p className="text-center text-gray-600 text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8">
          We are a team of experienced professionals dedicated to providing the
          best IT solutions for your business.
        </p>
      </div>

      {/* Grid of team cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
}
