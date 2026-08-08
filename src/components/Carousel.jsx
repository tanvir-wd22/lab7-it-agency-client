import { motion } from "motion/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import DynamicSlide from "./DynamicSlide";

// Keeping slide data in an array (instead of 3 copy-pasted <SwiperSlide>
// blocks) makes it easy to add a 4th banner later — just add an object.
const slides = [
  {
    image: banner1,
    heading: "Transform Your Business",
    description:
      "We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter",
  },
  {
    image: banner2,
    heading: "Build Faster",
    description:
      "We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter",
  },
  {
    image: banner3,
    heading: "Scale Smarter",
    description:
      "We build scalable web applications, AI solutions, and digital experiences that help companies grow faster and smarter",
  },
];

const Carousel = () => {
  return (
    // Entrance animation: fades + rises into place once it scrolls into view.
    // whileHover gives it the tiny shadcn-card "lift" on hover.
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-[75vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        // Swiper's nav arrows + pagination dots are styled here with
        // Tailwind's arbitrary-selector syntax instead of a style tag /
        // CSS variable — [&_.swiper-x] targets Swiper's own class names.
        className="h-full w-full
          [&_.swiper-button-next]:h-8 [&_.swiper-button-next]:w-8 [&_.swiper-button-next]:text-base-content [&_.swiper-button-next]:after:text-base
          [&_.swiper-button-prev]:h-8 [&_.swiper-button-prev]:w-8 [&_.swiper-button-prev]:text-base-content [&_.swiper-button-prev]:after:text-base
          [&_.swiper-pagination-bullet]:bg-base-content/40 [&_.swiper-pagination-bullet-active]:bg-primary
          sm:[&_.swiper-button-next]:h-10 sm:[&_.swiper-button-next]:w-10 sm:[&_.swiper-button-next]:after:text-xl
          sm:[&_.swiper-button-prev]:h-10 sm:[&_.swiper-button-prev]:w-10 sm:[&_.swiper-button-prev]:after:text-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.heading}>
            <DynamicSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Carousel;