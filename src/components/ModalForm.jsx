import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";

// Small stagger animation so the fields fade/slide in one after another
// instead of all appearing at once — this is what gives it that
// "premium" feel.
const fieldStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fieldItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// Shared classes for every input/textarea, so they all look consistent
// (clean border, soft focus ring — the shadcn-style look) without
// repeating the same long string 4 times.
const fieldClasses = `
  input w-full rounded-lg border-base-300
  bg-base-100 text-sm
  focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
`;

const ModalForm = ({ serviceTitle, onClose }) => {
  // -----------------------------------------------------------------
  // FORM STATE — one object holding every field, same pattern as the
  // Contact page. Each input's `name` attribute must match a key here.
  // -----------------------------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Runs on every keystroke. e.target.name tells us which field
  // changed, e.target.value is the new text. The computed key
  // [name]: value lets one function handle every field.
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    setIsSending(true);

    try {
      // 👉 Replace this fake delay with your real request, e.g.:
      // await fetch("/api/consultation", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ service: serviceTitle, ...formData }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Consultation request:", { service: serviceTitle, ...formData });
      setIsSent(true);
      setFormData({ name: "", email: "", mobile: "", message: "" });

      // Auto-close the modal a moment after showing the success state,
      // so the user gets to see the confirmation first.
      setTimeout(() => {
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error("Something went wrong sending the form:", error);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {isSent ? (
          // ---------------- Success state ----------------
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 py-10 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 size={28} />
            </span>
            <h4 className="text-lg font-semibold text-base-content">
              Request sent
            </h4>
            <p className="text-sm text-base-content/60">
              Thanks for reaching out — we'll be in touch shortly.
            </p>
          </motion.div>
        ) : (
          // ---------------- The form ----------------
          <motion.form
            key="form"
            variants={fieldStagger}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.div variants={fieldItem} className="mb-2 space-y-1">
              <h3 className="text-lg font-semibold text-base-content">
                Book Free Consultation
              </h3>
              {serviceTitle && (
                <p className="text-sm text-base-content/60">
                  Regarding: <span className="font-medium">{serviceTitle}</span>
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldItem}>
              <label className="label text-sm font-medium text-base-content">
                Name
              </label>
              <input
                type="text"
                name="name"
                className={fieldClasses}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={fieldItem}>
              <label className="label text-sm font-medium text-base-content">
                Email
              </label>
              <input
                type="email"
                name="email"
                className={fieldClasses}
                placeholder="john@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={fieldItem}>
              <label className="label text-sm font-medium text-base-content">
                Mobile / Whatsapp
              </label>
              <input
                type="text"
                name="mobile"
                className={fieldClasses}
                placeholder="Please enter number with country code"
                value={formData.mobile}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div variants={fieldItem}>
              <label className="label text-sm font-medium text-base-content">
                Message
              </label>
              <textarea
                name="message"
                className={`${fieldClasses} textarea h-24 resize-none`}
                placeholder="Do you have any inquiries regarding our IT services?"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </motion.div>

            <motion.button
              variants={fieldItem}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              type="submit"
              disabled={isSending}
              className="btn btn-neutral mt-2 w-full rounded-lg disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Book Free Consultation"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModalForm;