import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import DynamicSlide from './DynamicSlide';

const Carousel = () => {
  return (
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
  );
};

export default Carousel;
