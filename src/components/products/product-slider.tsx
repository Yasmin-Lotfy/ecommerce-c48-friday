"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="border bg-white p-6 shadow-sm rounded-2xl">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 "
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={`main-${i}`}>
              <Image width={500} height={500} alt="main-image-slider" src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
      
       {images.map((image, i) => {
          return (
            <SwiperSlide key={`thumbnail-${i}`}>
              <Image width={500} height={500} alt="main-image-slider" src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
