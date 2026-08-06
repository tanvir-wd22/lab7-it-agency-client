import { motion } from 'framer-motion';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import DynamicSlide from './DynamicSlide';

/* ============================================================================
   HOW THE "COLORFUL BORDER ON HOVER" WORKS
   ----------------------------------------------------------------------------
   There's no CSS property that spins a border by itself, so this is a small
   trick using layers, stacked back-to-front:

     1. The outer box has a little padding (`p-[3px]`) and `overflow-hidden`.
        That padding is what becomes the "border thickness" — anything
        painted behind the inner content peeks out through that gap.
     2. Layer A: a plain, always-visible border (theme's `base-300`).
     3. Layer B: a big square painted with a `conic-gradient` — a gradient
        that sweeps around a center point like a color wheel — using your
        theme's `primary`, `secondary`, and `accent` colors. It's oversized
        and centered, so no matter how it rotates, it always fully covers
        the box behind the content.
     4. The inner content (the actual Swiper) sits on top with its own
        background, covering everything except that thin padding gap — so
        only a colorful RING is visible, not a solid color block.

   On hover, Layer A fades out and Layer B fades in + spins forever. Mouse
   leaves, and it swaps back — Framer Motion's shared "rest" / "hover"
   variant names are what let the parent's hover state control the child's
   animation (same technique as the Dashboard button arrow in Header.jsx).
   ========================================================================= */

const Carousel = () => {
  return (
    // --- ENTRANCE ANIMATION -------------------------------------------------
    // "When the user first sees it": whileInView fires once the carousel
    // scrolls into view (or immediately, if it's already on screen at
    // load) — a gentle rise + fade + scale-up feels more intentional than
    // it just popping in.
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* --- HOVER WRAPPER --------------------------------------------------
          Separate motion.div for the hover state, so it doesn't fight
          with the entrance animation above. `variants` here just defines
          "rest" and "hover" as names — the actual border layers below use
          the SAME names to react to this element being hovered. */}
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={{ rest: { y: 0 }, hover: { y: -4 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl p-[3px] shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20"
      >
        {/* Layer A — plain themed border, visible by default */}
        <div className="absolute inset-0 rounded-2xl bg-base-300 transition-opacity duration-300 group-hover:opacity-0" />

        {/* Layer B — the rotating rainbow border, hidden until hover */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[75%]"
          style={{
            background:
              'conic-gradient(from 0deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))',
          }}
          variants={{
            rest: { opacity: 0, rotate: 0 },
            hover: {
              opacity: 1,
              rotate: 360,
              transition: {
                opacity: { duration: 0.3 },
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              },
            },
          }}
        />

        {/* Actual carousel content — sits on top, covers the middle,
            leaves only the thin padding gap for the border to show through. */}
        <div
          className="relative z-10 overflow-hidden rounded-[13px] bg-base-100"
          // Swiper reads this CSS variable for its nav arrows + active
          // pagination dot — pointing it at your theme's primary color
          // keeps it from defaulting to Swiper's stock blue.
          style={{ '--swiper-theme-color': 'var(--color-primary)' }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <DynamicSlide
                image={banner1}
                heading={'Transform Your Business'}
                description={
                  'We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter'
                }
              ></DynamicSlide>
            </SwiperSlide>
            <SwiperSlide>
              <DynamicSlide
                image={banner2}
                heading={'Build Faster'}
                description={
                  'We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter'
                }
              ></DynamicSlide>
            </SwiperSlide>
            <SwiperSlide>
              <DynamicSlide
                image={banner3}
                heading={'Scale Smarter'}
                description={
                  'We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter'
                }
              ></DynamicSlide>
            </SwiperSlide>
          </Swiper>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Carousel;