import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ item }) {
  const {
    image,
    imageAlt = 'Service image',
    title,
    description,
    badges = [],
    ctaLabel = 'Learn More',
    ctaHref,
    onCtaClick,
  } = item;

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

        {/* CTA */}
        {ctaHref ? (
          <a
            href={ctaHref}
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
          </a>
        ) : (
          <button
            type="button"
            onClick={onCtaClick}
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
        )}
      </div>
    </div>
  );
}
