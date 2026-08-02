import {
  Database,
  Settings2,
  Cookie,
  Share2,
  ShieldCheck,
  UserCog,
  Baby,
  RefreshCw,
  Mail,
} from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Fake content for "Lab7" (the same agency name used in your navbar
// and footer). Kept separate from the markup so editing any clause
// later never means touching JSX — same pattern as your
// servicesData / pricingPlansData files.
//
// Each section has a `slug` — a URL-safe id (no spaces) used as the
// target for the sidebar/nav links below — and an `icon`, so every
// section gets a small visual anchor instead of just a number.
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
    slug: "cookies-and-tracking",
    title: "Cookies & Tracking Technologies",
    icon: Cookie,
    body: [
      "Our website uses cookies to remember your preferences and to understand which pages and services visitors find most useful.",
      "You can disable cookies at any time through your browser settings — some parts of the site, like saved form progress, may not work as smoothly without them.",
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
  {
    slug: "childrens-privacy",
    title: "Children's Privacy",
    icon: Baby,
    body: [
      "Lab7's services are intended for businesses and individuals 18 years or older. We do not knowingly collect personal information from children.",
    ],
  },
  {
    slug: "changes-to-this-policy",
    title: "Changes to This Policy",
    icon: RefreshCw,
    body: [
      "We may update this Privacy Policy from time to time as our services evolve. Any changes will be posted on this page along with a revised \"last updated\" date.",
    ],
  },
];

// Contact details — reused from your existing Contact section so
// this page stays consistent with the rest of the site.
const privacyContact = {
  email: "mail@domain.com",
  phone: "+91 1234567890",
  address: "123 Street, NY, USA",
};

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// One policy section, styled as its own frosted card (same recipe as
// TeamCard / InfoCard / TestimonialCard: bg-white/[0.04] + a barely-
// there border). `scroll-mt-24` matters here: it's what stops the
// section from tucking in behind a sticky navbar when a nav link
// jumps straight to it — without it, the top of the card would be
// hidden right under the header.
// ---------------------------------------------------------------
function PolicyCard({ slug, title, icon: Icon, body }) {
  return (
    <div
      id={slug}
      className="scroll-mt-24 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.07] sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h3>
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:pl-12">
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
// translate-x on hover gives a small, tactile "this is clickable" cue.
function SidebarLink({ slug, title, icon: Icon }) {
  return (
    <a
      href={`#${slug}`}
      className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-all duration-200 hover:translate-x-0.5 hover:bg-white/5 hover:text-white"
    >
      <Icon className="h-4 w-4 shrink-0 text-blue-400/70 transition-colors duration-200 group-hover:text-blue-400" />
      <span className="truncate">{title}</span>
    </a>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Layout, top to bottom / left to right:
//   1. Heading + description — plain page background, outside the
//      navy box, same "heading outside the box" rule used across
//      the Services, Contact, and Team sections.
//   2. The navy box, split in two on tablet/desktop (md+):
//        - a sticky sidebar of quick-jump links on the left
//        - the actual policy cards on the right
//      On mobile, the sidebar becomes a horizontally scrollable pill
//      row above the stacked cards instead — there's no room for a
//      side column on a small screen, so the same links just move.
//
// No horizontal padding, max-width, or mx-auto is set on the section
// itself, and no vertical margin either — the root layout already
// wraps every page in `max-w-7xl mx-auto w-11/12 my-8 lg:my-16`, so
// repeating any of that here would double it up. Only the padding
// *inside* the box (p-6/p-8/p-10) and the gap before it (mt-10)
// remain, since those are internal to this component.
// ---------------------------------------------------------------
export default function PrivacyPolicy() {
  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION — outside the box ---------- */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Legal
        </span>

        <h2 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Privacy Policy
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          How Lab7 collects, uses, and protects your information when you
          use our website or work with us on a project.
        </p>

        <span className="mx-auto mt-4 block h-1 w-10 rounded-full bg-blue-500" />

        <p className="mt-4 text-xs font-medium text-slate-400">
          Last updated: August 2, 2026
        </p>
      </div>

      {/* ---------- THE BOX — dark navy background ---------- */}
      <div
        className="mt-10 overflow-hidden rounded-3xl sm:mt-12"
        style={{ backgroundColor: "#0A2239" }}
      >
        {/* Mobile / tablet: horizontally scrollable pill nav.
            Hidden from md upward, where the sidebar takes over instead. */}
        <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-4 md:hidden">
          {policySections.map((section) => (
            <a
              key={section.slug}
              href={`#${section.slug}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/10 hover:text-white"
            >
              {section.title}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[220px_1fr] md:gap-10 md:p-10">
          {/* Desktop / tablet sidebar — sticky so it stays in view
              while the policy cards scroll past it. Hidden on mobile,
              where the pill row above takes its place instead. */}
          <nav className="hidden md:sticky md:top-24 md:block md:h-fit">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              On this page
            </p>
            <div className="flex flex-col gap-0.5">
              {policySections.map((section) => (
                <SidebarLink key={section.slug} {...section} />
              ))}
              <SidebarLink slug="contact-us" title="Contact Us" icon={Mail} />
            </div>
          </nav>

          {/* Policy cards */}
          <div className="flex flex-col gap-4">
            {policySections.map((section) => (
              <PolicyCard key={section.slug} {...section} />
            ))}

            {/* Contact card — same details as your Contact page, so
                this stays consistent instead of listing different
                info somewhere else on the site. */}
            <div
              id="contact-us"
              className="scroll-mt-24 rounded-xl border border-blue-400/20 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.07] sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  Contact Us
                </h3>
              </div>

              <div className="mt-3 flex flex-col gap-1 sm:pl-12">
                <p className="text-sm leading-relaxed text-slate-400">
                  Questions about this policy, or want to exercise any of
                  your rights above? Reach out any time:
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {privacyContact.email}
                </p>
                <p className="text-sm font-semibold text-white">
                  {privacyContact.phone}
                </p>
                <p className="text-sm text-slate-400">
                  {privacyContact.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}