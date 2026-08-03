import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Headphones } from "lucide-react";

// ---------------------------------------------------------------
// 1. DATA
// Each entry now has a stable `id` — React wants a `key` on every
// list item so it can tell items apart when re-rendering, and an id
// is a safer key than the label text (labels can change or repeat,
// ids don't).
// ---------------------------------------------------------------
const contactInfo = [
  {
    id: 1,
    icon: Phone,
    label: "Call to ask any question",
    value: "+91 1122334455",
  },
  {
    id: 2,
    icon: Mail,
    label: "Email to get free quote",
    value: "mail@domain.com",
  },
  {
    id: 3,
    icon: MapPin,
    label: "Visit Our Office",
    value: "123 Street, NY, USA",
  },
];

// The dropdown options for the "Select a service" field.
const serviceOptions = [
  "Web Development",
  "App Development",
  "Consulting",
  "Other",
];

// ---------------------------------------------------------------
// 2. SMALL REUSABLE PIECE
// One info card. Like the TeamMembers cards, this now carries the
// navy (#0A2239) background itself instead of sitting on one shared
// navy panel — so the gap between the 3 cards shows the page
// background, not navy.
//
// The shadcn "Card" recipe is a hairline border + real elevation
// (shadow-sm at rest, shadow-md on hover) rather than a lighter fill
// doing the work of separating the card from its background.
//
// "group" on the wrapper + "group-hover" on the icon lets the icon
// react to hovering anywhere on the card, not just the icon itself.
// ---------------------------------------------------------------
function InfoCard({ icon: Icon, label, value }) {
  return (
    <div
      className="group flex items-center gap-3 rounded-xl border border-white/10 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-md"
      style={{ backgroundColor: "#0A2239" }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400 transition-transform duration-200 group-hover:scale-110">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// 3. MAIN COMPONENT
//
// Structure, top to bottom:
//   1. Heading + description — plain page background.
//   2. 3 info cards — each one its own navy card (see InfoCard),
//      no shared panel behind them.
//   3. Copy + quote form — the copy column stays plain (it's just
//      text, not a bounded module), but the form itself is now its
//      own navy card, same treatment as the info cards above, instead
//      of both columns sitting inside one big navy box.
//
// No horizontal padding, max-width, or mx-auto is set on the section
// itself — that's handled once in the root layout (max-w-7xl mx-auto
// w-11/12), so adding it again here would double it up.
// ---------------------------------------------------------------
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading
    console.log("Quote request submitted:", formData);
    alert("Thanks! We'll get back to you shortly.");
  }

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

      {/* ---------- 3 INFO CARDS — each its own navy card ---------- */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {contactInfo.map((item) => (
          <InfoCard key={item.id} {...item} />
        ))}
      </div>

      {/* ---------- COPY + QUOTE FORM ---------- */}
      <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 md:grid-cols-2 md:items-center">
        {/* Left: copy — plain page background, not a card */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            Request A Quote
          </span>

          <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            Need A Free Quote? Please Feel Free to Contact Us
          </h3>

          <span className="mt-3 block h-1 w-10 rounded-full bg-blue-500" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900">
              <Clock className="h-4 w-4 text-blue-500" />
              Reply within 24 hours
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900">
              <Headphones className="h-4 w-4 text-blue-500" />
              24 hrs telephone support
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-500">
            I'd be happy to provide you with a free quote. Just share a few
            details about what you need, any specific requirements, and
            other relevant information so I can put together an accurate
            estimate.
          </p>

          <div className="group mt-6 flex w-fit items-center gap-3 rounded-lg transition-transform duration-200 hover:-translate-y-0.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-500 transition-transform duration-200 group-hover:scale-110">
              <Phone className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm text-slate-500">
                Call to ask any question
              </p>
              <p className="text-sm font-semibold text-slate-900">
                +91 1234567890
              </p>
            </div>
          </div>
        </div>

        {/* Right: quote form — its own navy card, shadcn-style */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-white/10 p-6 shadow-sm transition-all duration-200 hover:border-blue-400/30 hover:shadow-md"
          style={{ backgroundColor: "#0A2239" }}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
            />

            {/* Note: browsers render <option> with system colors, so
                a dark <select> can still show a light dropdown list
                when opened — that's a native HTML limitation, not a
                bug in this code. */}
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white transition-colors duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
            >
              <option value="" disabled className="text-slate-900">
                Select A Service
              </option>
              {serviceOptions.map((service) => (
                <option
                  key={service}
                  value={service}
                  className="text-slate-900"
                >
                  {service}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Messages"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
              className="w-full resize-none rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
            />

            <button
              type="submit"
              className="mt-1 w-full rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-200 hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A2239]"
            >
              Request A Quote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}