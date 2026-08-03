import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ClientForm from "./ClientForm";

export default function ServiceCard({ item }) {
  // Pull out the fields we need from "item", with some defaults.
  const {
    image,
    imageAlt = "Service image",
    title,
    description,
    badges = [],
    ctaLabel = "Learn More",
  } = item;

  // A ref gives us a direct handle to this card's <dialog> element.
  // Using a ref (instead of document.getElementById) means each
  // ServiceCard has its own modal — no ID clashes if you render
  // several cards on the same page.
  const modalRef = useRef(null);

  return (
    <div
      className="
        group w-full overflow-hidden rounded-2xl
        border border-white/10
        bg-[#0A2239]
        p-3
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/20
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={imageAlt}
          className="
            h-52 w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Badges */}
        {badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge) => {
              const Icon = badge.icon;

              return (
                <span
                  key={badge.label}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full
                    border border-white/10
                    bg-white/5
                    px-3 py-1
                    text-xs font-medium
                    text-white/80
                    backdrop-blur-sm
                  "
                >
                  {Icon && <Icon size={13} />}
                  {badge.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Title */}
        <h3
          className="
            text-lg font-semibold
            tracking-tight
            text-white
            sm:text-xl
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="
            mt-3
            text-sm
            leading-6
            text-white/70
          "
        >
          {description}
        </p>

        {/* CTA button — just one button now. Clicking it opens the modal. */}
        <button
          type="button"
          onClick={() => modalRef.current?.showModal()}
          className="
            mt-6 flex w-full items-center justify-center gap-2
            rounded-xl
            bg-white
            px-4 py-2.5
            text-sm font-medium
            text-[#0A2239]
            transition
            hover:bg-white/90
          "
        >
          {ctaLabel}
          <ArrowRight size={16} />
        </button>
      </div>

      {/* DaisyUI modal. `ref={modalRef}` is how the button above finds it. */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* DaisyUI's standard close button, top-right corner */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <ClientForm />
        </div>

        {/* Clicking the backdrop closes the modal */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
