'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const SLIDES = [
  {
    id: 1,
    title: 'The Future On Your Wrist',
    image: '/banners/banner_future.jpg',
    href: '#scrolly-section',
  },
  {
    id: 2,
    title: 'Conquer The Dark - Rugged Series',
    image: '/banners/banner_rugged.jpg',
    href: '#scrolly-section',
  },
];

export default function HeroBannerSlider() {
  return (
    <section className="relative w-full bg-black select-none overflow-hidden group">
      <div className="w-full aspect-[1024/434] max-h-[85vh] relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
            bulletClass: 'custom-banner-bullet',
            bulletActiveClass: 'custom-banner-bullet-active',
          }}
          navigation={{
            prevEl: '.banner-prev-btn',
            nextEl: '.banner-next-btn',
          }}
          className="w-full h-full"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full bg-black">
              <a
                href={slide.href}
                className="block w-full h-full relative cursor-pointer"
                title={slide.title}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Sleek Floating Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Slide"
          className="banner-prev-btn absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 text-white hover:text-cyan-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-2xl backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="banner-next-btn absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/60 hover:bg-black/90 text-white hover:text-cyan-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-2xl backdrop-blur-md"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Custom Progress Bar Pagination */}
        <div className="custom-swiper-pagination absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3" />
      </div>
    </section>
  );
}
