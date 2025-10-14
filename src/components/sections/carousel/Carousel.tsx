"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/data/homepage";

const Carousel = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = (): void => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full aspect-[5/3] sm:aspect-[4/2] md:aspect-[3/1] overflow-hidden mb-3 md:mb-12 lg:mb-12">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((src, i) => (
          <div key={i} className="relative w-full shrink-0 h-full">
            <Image
              src={src}
              alt={`Banner ${i + 1}`}
              fill
              className="object-cover object-center w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Arrow Left */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute top-1/2 left-4 -translate-y-1/2 border-2 border-outlined text-icon bg-pink-light rounded-full p-2 hover:text-white hover:bg-primary hover:border-primary transition duration-300 cursor-pointer"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Arrow right */}
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute top-1/2 right-4 -translate-y-1/2 border-2 border-outlined text-icon bg-pink-light rounded-full p-2 hover:text-white hover:bg-primary hover:border-primary transition duration-300 cursor-pointer"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 sm:h-1 md:h-2 lg:h-2 rounded-full ${
              i === current
                ? "w-3 sm:w-3 md:w-6 lg:w-6 bg-white"
                : "w-1 sm:w-1 md:w-3 lg:w-3 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
