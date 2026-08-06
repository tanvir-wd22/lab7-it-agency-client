import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Heading from "../components/Heading";

const infoCards = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "Get a response within 24 hours",
    value: "hello@company.com",
    href: "mailto:hello@company.com",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    subtitle: "Instant support available now",
    value: "Start chatting",
    href: "#chat",
  },
  {
    icon: Phone,
    title: "Phone",
    subtitle: "Mon–Fri, 9AM–6PM EST",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Office",
    subtitle: "Schedule an in-person meeting",
    value: "123 Innovation St, Tech City",
  },
];

// ---- Framer Motion variants -------------------------------------------

const columnStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const fieldStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const fieldItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// -------------------------------------------------------------------------

const InfoCard = ({ icon: Icon, title, subtitle, value, href }) => {
  const content = (
    <div className="flex items-start gap-4">
      <span
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-lg border border-base-300 bg-base-100
          text-base-content/70
          transition-colors duration-200
          group-hover:border-primary/40 group-hover:text-primary
        "
      >
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-base-content">{title}</p>
        <p className="mt-0.5 text-sm text-base-content/55">{subtitle}</p>
        <p className="mt-1.5 text-sm font-semibold text-base-content">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={cardEntrance}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex-1"
    >
      <div
        className="
          relative flex h-full items-center overflow-hidden rounded-xl
          border border-base-300 bg-base-200/40 p-5
          transition-colors duration-300
          group-hover:bg-base-200/70
        "
      >
        {href ? (
          <a href={href} className="w-full">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
      {/* gradient ring, exact 1px ring via mask, fades in on hover */}
      <div
        aria-hidden="true"
        className="
          premium-ring pointer-events-none absolute inset-0 rounded-xl p-px
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </motion.div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending" || !agreed) return;
    setStatus("sending");
    // Replace with your real submit call.
    setTimeout(() => {
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", company: "", message: "" });
      setAgreed(false);
    }, 1400);
  };

  const inputClasses = `
    w-full rounded-lg border border-base-300 bg-base-100
    px-3.5 py-2.5 text-sm text-base-content
    placeholder:text-base-content/35
    transition-colors duration-200
    focus:border-primary focus:outline-none
    focus:ring-2 focus:ring-primary/20
  `;

  return (
    // No outer margin/padding — this fills whatever container wraps it
    // (your max-w-7xl mx-auto w-11/12 my-8).
    <div className="relative w-full">
      {/* Animated gradient-ring hover border, shared across all cards.
          Ring shape comes from mask-composite: exclude, so every edge —
          left included — is guaranteed coverage regardless of card size. */}
      <style>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-gradient-angle {
          to { --gradient-angle: 360deg; }
        }
        .premium-ring {
          background: conic-gradient(
            from var(--gradient-angle),
            var(--color-primary),
            var(--color-secondary),
            var(--color-accent),
            var(--color-primary)
          );
          animation: spin-gradient-angle 3.5s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-ring { animation: none; }
        }
      `}</style>

      {/* Ambient background glow — subtle, contained within this component */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-1/4 -z-10 h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/4 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-10 max-w-2xl space-y-3 text-center"
      >
        <Heading
          title="Contact Us"
          description="Ready to start your next project? Our team is here to help you succeed. Reach out and let's discuss how we can bring your ideas to life."
        />
      </motion.div>

      {/* Two-column layout — items-stretch makes both columns share the
          exact same height as the taller one, automatically. */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* ---------------- Left: info cards ---------------- */}
        <motion.div
          variants={columnStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex h-full flex-col gap-4"
        >
          {infoCards.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </motion.div>

        {/* ---------------- Right: form ---------------- */}
        <motion.div
          variants={cardEntrance}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="group relative h-full"
        >
          <div
            className="
              relative flex h-full flex-col overflow-hidden rounded-xl
              border border-base-300 bg-base-100 p-6
              shadow-sm transition-shadow duration-300
              group-hover:shadow-md
            "
          >
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-1 flex-col items-center justify-center gap-4 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success"
                  >
                    <CheckCircle2 size={28} />
                  </motion.span>
                  <div>
                    <h4 className="text-lg font-semibold text-base-content">
                      Message sent
                    </h4>
                    <p className="mt-1 text-sm text-base-content/60">
                      Thanks for reaching out — we'll reply within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-medium text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={fieldStagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  onSubmit={handleSubmit}
                  className="flex h-full flex-col"
                >
                  <motion.div variants={fieldItem}>
                    <h3 className="text-lg font-semibold text-base-content">
                      Send us a message
                    </h3>
                    <p className="mt-1 text-sm text-base-content/55">
                      Fill out the form below and we'll get back to you
                      within 24 hours.
                    </p>
                  </motion.div>

                  <div className="mt-6 flex-1 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <motion.div variants={fieldItem} className="space-y-1.5">
                        <label htmlFor="firstName" className="text-sm font-medium text-base-content">
                          First Name <span className="text-error">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className={inputClasses}
                        />
                      </motion.div>

                      <motion.div variants={fieldItem} className="space-y-1.5">
                        <label htmlFor="lastName" className="text-sm font-medium text-base-content">
                          Last Name <span className="text-error">*</span>
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className={inputClasses}
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={fieldItem} className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-base-content">
                        Email Address <span className="text-error">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem} className="space-y-1.5">
                      <label htmlFor="company" className="text-sm font-medium text-base-content">
                        Company
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className={inputClasses}
                      />
                    </motion.div>

                    <motion.div variants={fieldItem} className="space-y-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-base-content">
                        Message <span className="text-error">*</span>
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, or how we can help..."
                        className={`${inputClasses} resize-none`}
                      />
                    </motion.div>

                    <motion.label
                      variants={fieldItem}
                      className="flex cursor-pointer items-start gap-2.5 text-sm text-base-content/70"
                    >
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        required
                        className="checkbox checkbox-sm mt-0.5 rounded border-base-300"
                      />
                      <span>
                        I agree to the{" "}
                        <a href="#" className="font-medium text-base-content hover:text-primary">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="font-medium text-base-content hover:text-primary">
                          Privacy Policy
                        </a>
                      </span>
                    </motion.label>
                  </div>

                  <motion.button
                    variants={fieldItem}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    type="submit"
                    disabled={status === "sending" || !agreed}
                    className="
                      mt-6 flex w-full items-center justify-center gap-2
                      rounded-lg bg-base-content px-4 py-2.5
                      text-sm font-semibold text-base-100
                      transition-opacity duration-200
                      hover:opacity-90
                      disabled:cursor-not-allowed disabled:opacity-50
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-primary focus-visible:ring-offset-2
                      focus-visible:ring-offset-base-100
                    "
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* gradient ring on the form card too */}
          <div
            aria-hidden="true"
            className="
              premium-ring pointer-events-none absolute inset-0 rounded-xl p-px
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;