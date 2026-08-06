import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ClientForm from "./ClientForm";

// No border, background panel, or hover-lift here — the Services.jsx
// wrapper already owns the card surface (border, shadow, gradient ring).
// This component only handles what's local to it: image, copy, CTA, modal.
export default function ServiceCard({ item }) {
  const {
    image,
    imageAlt = "Service image",
    title,
    description,
    badges = [],
    ctaLabel = "Learn More",
  } = item;

  const modalRef = useRef(null);

  return (
    <div className="flex h-full w-full flex-col p-3">
      {/* Image */}
      <div className="group relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={imageAlt}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.label}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full border border-base-300
                    bg-base-200/60 px-3 py-1
                    text-xs font-medium text-base-content/70
                  "
                >
                  {Icon && <Icon size={13} />}
                  {badge.label}
                </span>
              );
            })}
          </div>
        )}

        <h3 className="text-lg font-semibold tracking-tight text-base-content sm:text-xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-base-content/60">
          {description}
        </p>

        {/* CTA — shadcn Button-style: solid, small radius, focus ring */}
        <button
          type="button"
          onClick={() => modalRef.current?.showModal()}
          className="
            mt-auto flex w-full items-center justify-center gap-2
            rounded-lg bg-primary px-4 py-2.5
            text-sm font-medium text-primary-content
            transition-colors duration-200
            hover:bg-primary/90
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-primary focus-visible:ring-offset-2
            focus-visible:ring-offset-base-100
          "
        >
          {ctaLabel}
          <ArrowRight size={16} />
        </button>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border border-base-300 shadow-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <ClientForm />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}