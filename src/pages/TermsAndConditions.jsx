import { useState } from "react";
import {
  FileCheck,
  Briefcase,
  Copyright,
  ShieldAlert,
  XCircle,
  ChevronDown,
} from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Kept to the 5 clauses a client actually needs to know before
// working with Lab7 — same "trim to what matters" call made on the
// Privacy Policy page.
//
// `number` is new here: a legal document's clauses genuinely are a
// sequence (Clause 1 is read before Clause 5, and they're often
// cross-referenced by number), so — unlike a generic services grid —
// a numbered marker actually encodes something true about the
// content instead of just decorating it.
// ---------------------------------------------------------------
const termsSections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    icon: FileCheck,
    body: [
      "By requesting a quote, signing a proposal, or otherwise engaging Lab7 for a project, you agree to be bound by these Terms & Conditions for the duration of that engagement.",
      "If you're accepting on behalf of a company, you confirm you have the authority to bind that company to these terms.",
    ],
  },
  {
    number: "02",
    title: "Services & Payment",
    icon: Briefcase,
    body: [
      "Project scope, deliverables, and pricing are agreed in writing before work begins — through a proposal, statement of work, or quote — and that document governs the specifics of each engagement.",
      "Invoices are due within the timeframe stated on the invoice. Late payment may pause active work until the account is brought current.",
    ],
  },
  {
    number: "03",
    title: "Intellectual Property",
    icon: Copyright,
    body: [
      "Once a project is paid in full, ownership of the final deliverables transfers to you, except for any third-party assets, libraries, or tools that carry their own licensing terms.",
      "Lab7 retains the right to display completed work in our portfolio and marketing materials, unless you've requested otherwise in writing.",
    ],
  },
  {
    number: "04",
    title: "Limitation of Liability",
    icon: ShieldAlert,
    body: [
      "Lab7's liability for any claim arising from a project is limited to the amount paid for that specific engagement.",
      "We aren't liable for indirect, incidental, or consequential damages, including lost profits or data, arising from the use of delivered work.",
    ],
  },
  {
    number: "05",
    title: "Termination",
    icon: XCircle,
    body: [
      "Either party may terminate an active engagement with written notice. You'll be billed for work completed up to the termination date.",
      "Lab7 reserves the right to pause or end a project if payment terms aren't met or if the working relationship becomes unworkable.",
    ],
  },
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
//
// One clause, styled as a shadcn Accordion item rather than the
// Privacy Policy's always-open cards — that's the deliberate visual
// split between the two pages: a policy is read top to bottom, but
// terms are referenced one clause at a time, so collapse-by-default
// fits how someone actually uses this page.
//
// Rows cycle through three navy shades from the same family as the
// rest of the site — dark (#0A2239), medium (#123A5E), light
// (#1B4A73) — instead of one flat background. It's a rhythm across
// depths, not a second color palette — every row still reads as
// "the same surface."
//
// The whole list sits inside one continuous rounded shadcn-style
// container (single border, hairline dividers between rows) instead
// of each clause being its own separate floating card, which is what
// actually distinguishes an "accordion" from a "grid of cards" as a
// pattern.
// ---------------------------------------------------------------
// Three shades of the same navy — dark, medium, light — cycled
// across rows instead of a plain two-way alternation. Still one
// palette, just stepping up in lightness every third row, so the
// rhythm reads as "same surface, three depths" rather than a new
// set of colors.
const ROW_SHADES = ["#0A2239", "#123A5E", "#1B4A73"];

function TermsItem({ section, isOpen, onToggle, isLast }) {
  const { number, title, icon: Icon, body } = section;
  const shade = ROW_SHADES[section.rowIndex % ROW_SHADES.length];

  return (
    <div
      className={!isLast ? "border-b border-white/10" : ""}
      style={{ backgroundColor: shade }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.03] sm:px-6 sm:py-5"
      >
        <span className="text-sm font-semibold tabular-nums text-blue-400/70">
          {number}
        </span>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
          <Icon className="h-4.5 w-4.5" />
        </span>

        <h3 className="flex-1 text-base font-semibold tracking-tight text-white sm:text-lg">
          {title}
        </h3>

        <ChevronDown
          className={`h-4.5 w-4.5 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 px-5 pb-5 pl-[4.75rem] sm:px-6 sm:pb-6 sm:pl-[5rem]">
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
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Structure, top to bottom:
//   1. Heading + description — plain page background.
//   2. One continuous accordion — every clause collapsed to a
//      single-line row by default; clicking a row expands it in
//      place, and clicking it again (or another row) collapses it.
//
// This is deliberately a different shape from the Privacy Policy
// page (sidebar + always-open cards): same navy palette and shadcn
// depth language, but a distinct interaction and layout so the two
// legal pages don't read as the same template with different text.
// ---------------------------------------------------------------
export default function TermsAndConditions() {
  const [openSlug, setOpenSlug] = useState(termsSections[0].title);

  return (
    <section className="w-full">
      {/* ---------- HEADING + DESCRIPTION ---------- */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Terms & Conditions
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-slate-500 sm:text-lg md:text-xl">
          The terms that apply when you request a quote, hire Lab7 for a
          project, or otherwise use our services.
        </p>

        <span className="mx-auto mt-4 block h-1 w-10 rounded-full bg-blue-500" />

        <p className="mt-4 text-xs font-medium text-slate-400">
          Last updated: August 2, 2026 — we'll revise this date whenever the
          terms change.
        </p>
      </div>

      {/* ---------- ACCORDION — one continuous rounded container ----------
          No max-w or mx-auto here: the root layout already constrains and
          centers the page (max-w-7xl mx-auto w-11/12 my-8), so this takes
          the full width that wrapper provides instead of narrowing again. */}
      <div className="mt-10 w-full overflow-hidden rounded-2xl border border-white/10 shadow-sm sm:mt-12">
        {termsSections.map((section, index) => (
          <TermsItem
            key={section.title}
            section={{ ...section, rowIndex: index }}
            isOpen={openSlug === section.title}
            isLast={index === termsSections.length - 1}
            onToggle={() =>
              setOpenSlug((current) =>
                current === section.title ? null : section.title
              )
            }
          />
        ))}
      </div>
    </section>
  );
}