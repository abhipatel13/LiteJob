import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import items from '../homePage/items.js'

const Carousel = ({ items, visibleItems, onClickCarouselData }) => {
  const [currentIndex] = useState(0);

  const totalItems = items.length;
  const lastIndex = totalItems - visibleItems;

  return (
    <div className="relative">
      <Swiper
        navigation
        className="xs:mt-8 items-swiper"
        slidesPerView={"auto"}
        spaceBetween={0}
        modules={[Navigation]}
      >
        {items
          .slice(currentIndex, currentIndex + visibleItems)
          .map((item, index) => (
            <SwiperSlide key={index} className="w-[7rem]">
              <a
                href={item.href}
                className="flex flex-col items-center justify-center opacity-60 hover:text-[#014e56] hover:opacity-100"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  onClick={() => onClickCarouselData(item.title)}
                  className="mb-1 w-9 h-9 cursor-pointer"
                />
                <div className="text-center font-semibold text-xs cursor-pointer">
                  {item.title}
                </div>
              </a>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
