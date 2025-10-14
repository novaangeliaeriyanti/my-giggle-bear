"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { reviews } from "@/data/homepage";
import Title from "../ui/Title";

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
        <Title text={reviews?.title} />
        <span className="text-body max-w-2xl text-gray-500">{reviews?.description}</span>
      </div>

      {/* Scrollable reviews */}
      <div className="group relative">
        <div
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 
            -translate-x-[40px] group-hover:translate-x-0
            opacity-0 group-hover:opacity-100
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 ease-in-out
              flex z-10 text-icon bg-pink-light border-1 border-outlined p-2
            hover:text-white hover:bg-primary hover:border-primary rounded-full
            "
        >
          <ChevronLeft className="w-6 h-6" />
        </div>

        {/* Container scroll */}
        <div
          ref={scrollRef}
          className={`
            flex overflow-x-auto gap-5 scroll-smooth scrollbar-hidden
            px-4 md:px-8
            ${reviews?.items?.length <= 2 ? "justify-center" : "justify-start"}
          `}
        >
          {reviews?.items?.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 overflow-hidden w-[260px] sm:w-[300px] md:w-[320px] bg-white card-rounded border border-gray-200 flex flex-col gap-3"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 text-tiny font-bold bg-yellow-50 border border-gray-200 text-white rounded-bl-xl rounded-tr-xl lg:rounded-tr-3xl p-1 lg:px-4 lg:py-2 z-10">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
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
                  <span className="text-body text-secondary line-clamp-2">{review.name}</span>
                </div>
                <span className="text-small line-clamp-3">“{review.comment}”</span>
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 
            translate-x-[40px] group-hover:translate-x-0
            opacity-0 group-hover:opacity-100
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 ease-in-out
              flex z-10 text-icon bg-pink-light border-1 border-outlined p-2
            hover:text-white hover:bg-primary hover:border-primary rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
