import { Database, Settings2, Share2, ShieldCheck, UserCog } from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// The 5 sections a visitor actually needs to read or act on.
// "Contact Us" was dropped as its own card here — it duplicates the
// dedicated Contact section elsewhere on the site, so repeating it
// on this page just added a second copy of the same info to scroll
// past.
//
// Each section has a `slug` — a URL-safe id used as the target for
// the sidebar/nav links below — and an `icon`, so every section gets
// a small visual anchor instead of just a number.
// ---------------------------------------------------------------
const policySections = [
  {
    slug: "information-we-collect",
    title: "Information We Collect",
    icon: Database,
    body: [
      "When you use Lab7's website or engage us for a project — web development, app development, UI/UX design, digital marketing, or video editing — we may collect your name, email address, phone number, and company details submitted through our contact and quote request forms.",
      "We also automatically collect basic technical data such as browser type, device type, and pages visited, to help us understand how our site is used.",
    ],
  },
  {
    slug: "how-we-use-your-information",
    title: "How We Use Your Information",
    icon: Settings2,
    body: [
      "We use the information you provide to respond to quote requests, deliver the services you've hired us for, send project updates, and improve our website and offerings.",
      "We do not use your personal information for anything beyond what's needed to run and improve Lab7's services.",
    ],
  },
  {
    slug: "data-sharing",
    title: "Data Sharing & Third-Party Services",
    icon: Share2,
    body: [
      "Lab7 does not sell your personal information to anyone.",
      "We may share limited data with trusted third-party tools we use to run our business — such as email delivery services and analytics providers — solely to help us operate and improve the services described above.",
    ],
  },
  {
    slug: "data-security",
    title: "Data Security",
    icon: ShieldCheck,
    body: [
      "We take reasonable technical and organizational steps to protect the information you share with us from unauthorized access, loss, or misuse.",
      "That said, no method of transmission over the internet is 100% secure, and we can't guarantee absolute security.",
    ],
  },
  {
    slug: "your-rights",
    title: "Your Rights & Choices",
    icon: UserCog,
    body: [
      "You can ask Lab7 to access, correct, or delete the personal information we hold about you at any time by contacting us using the details below.",
      "You may also opt out of marketing emails at any point using the unsubscribe link included in those emails.",
    ],
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// One policy section, its own navy (#0A2239) card — like the Team
// and Testimonial cards. `scroll-mt-24` stops the section from
// tucking in behind a sticky navbar when a nav link jumps to it.
//
// This follows shadcn's actual Card anatomy more closely than the
// last pass: a header block (icon + title) separated from the body
// by a hairline rule, rather than icon/title/body all sharing one
// undivided block of padding. That header/content split — plus a
// hairline border and real elevation (shadow-sm at rest, shadow-md
// on hover) instead of a lighter fill — is what reads as "shadcn"
// rather than just "a rounded dark box."
// ---------------------------------------------------------------
function PolicyCard({ slug, title, icon: Icon, body }) {
  return (
    <div
      id={slug}
      className="scroll-mt-24 rounded-xl border border-white/10 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-md"
      style={{ backgroundColor: "#0A2239" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 border-b border-white/10 p-5 sm:p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h3>
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        {body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-sm leading-relaxed text-slate-400"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

// One sidebar link — a plain anchor jumping to a section's id.
// Styled for the light page background this section sits on, with
// translate-x on hover as a small, tactile "this is clickable" cue.
function SidebarLink({ slug, title, icon: Icon }) {
  return (
    <a
      href={`#${slug}`}
      className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-500 transition-all duration-200 hover:translate-x-0.5 hover:bg-slate-100 hover:text-slate-900"
    >
      <Icon className="h-4 w-4 shrink-0 text-blue-500/70 transition-colors duration-200 group-hover:text-blue-500" />
      <span className="truncate">{title}</span>
    </a>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Layout, top to bottom / left to right:
//   1. Heading + description — plain page background.
//   2. Mobile-only pill nav — a horizontally scrollable row of quick
//      jump links, shown below md where there's no room for a side
//      column.
//   3. md and up: a sticky sidebar of the same links on the left,
//      policy cards (each its own navy card) on the right. Below md
//      the sidebar is hidden and cards stack full-width, with the
//      pill row above taking over navigation.
// ---------------------------------------------------------------
export default function PrivacyPolicy() {
  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION ---------- */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Privacy Policy
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          How Lab7 collects, uses, and protects your information when you
          use our website or work with us on a project.
        </p>

        <span className="mx-auto mt-4 block h-1 w-10 rounded-full bg-blue-500" />

        <p className="mt-4 text-xs font-medium text-slate-400">
          Last updated: August 2, 2026 — we'll revise this date whenever the
          policy changes.
        </p>
      </div>

      {/* ---------- MOBILE PILL NAV — hidden from md upward ---------- */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {policySections.map((section) => (
          <a
            key={section.slug}
            href={`#${section.slug}`}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-400/40 hover:text-slate-900"
          >
            {section.title}
          </a>
        ))}
      </div>

      {/* ---------- SIDEBAR + CARDS ---------- */}
      <div className="mt-6 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-[220px_1fr] md:gap-10">
        {/* Desktop / tablet sidebar — sticky so it stays in view while
            the policy cards scroll past it. Hidden on mobile, where
            the pill row above takes its place instead. */}
        <nav className="hidden md:sticky md:top-24 md:block md:h-fit">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            On this page
          </p>
          <div className="flex flex-col gap-0.5">
            {policySections.map((section) => (
              <SidebarLink key={section.slug} {...section} />
            ))}
          </div>
        </nav>

        {/* Policy cards */}
        <div className="flex flex-col gap-4">
          {policySections.map((section) => (
            <PolicyCard key={section.slug} {...section} />
          ))}
        </div>
      </div>
    </section>
  );
}