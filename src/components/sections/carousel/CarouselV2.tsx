'use client';

import { images } from '@/data/homepage';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CarouselV2() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.5,
      spacing: 20,
      origin: 'center',
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    mode: 'snap',
  });

  useEffect(() => {
    if (!slider || !slider.current) return;

    const interval = setInterval(() => {
      slider.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="w-full overflow-visible relative mt-4">
      <div
        ref={sliderRef}
        className="keen-slider"
        style={{ overflow: 'visible' }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="
              keen-slider__slide flex justify-center items-center relative w-full shrink-0
              aspect-[1/1] sm:aspect-[3/2] md:aspect-[2/1]
            "
          >
            <Image
              src={src}
              alt={`Slide ${i}`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
