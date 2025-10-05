"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { reviews } from "@/data/homepage";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 380;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="flex flex-col gap-8 md:gap-12 container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h2 className="logo font-bold flex items-center gap-2 text-2xl md:text-3xl">
          <span className="text-secondary">Customer</span>
          <span className="text-primary">Reviews</span>
        </h2>
        <p className="text-description max-w-2xl text-gray-500">
          Gain confidence in your purchase with real stories from our happy
          customers!
        </p>
      </div>

      {/* Scrollable reviews */}
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 
            -translate-x-[40px] group-hover:translate-x-0
            opacity-0 group-hover:opacity-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-300 ease-in-out
            flex z-10 text-pink-400 border-2 border-dashed border-pink-400 p-2
            hover:text-white hover:bg-pink-400 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Container scroll */}
        <div
          ref={scrollRef}
          className={`
            flex overflow-x-auto gap-5 scroll-smooth scrollbar-hidden
            px-4 md:px-8
            ${reviews.length <= 2 ? "justify-center" : "justify-start"}
          `}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 overflow-hidden w-[260px] sm:w-[300px] md:w-[320px] bg-white card-rounded card-rounded border border-gray-200 flex flex-col gap-3"
            >
              <div className="relative">
              <div className="absolute top-0 right-0 bg-yellow-50 border border-gray-200 text-white rounded-bl-xl rounded-tr-xl lg:rounded-tr-3xl font-bold p-1 lg:px-4 lg:py-2 z-10 text-xs sm:text-sm">
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              </div>
              <div className="flex flex-col gap-3 p-5 pt-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="object-cover w-16 h-16"
                  />
                  <p className="font-bold text-secondary line-clamp-2">{review.name}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                “{review.comment}”
              </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 
            translate-x-[40px] group-hover:translate-x-0
            opacity-0 group-hover:opacity-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-300 ease-in-out
            flex z-10 text-primary border-2 border-dashed border-primary p-2
            hover:text-white hover:bg-primary rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
