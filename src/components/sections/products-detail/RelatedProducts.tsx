"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { popularProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Title from "@/components/ui/Title";

interface Eventrops {
  title: string;
  description?: string;
  splitIndexTitle?: number;
}

export default function RelatedProducts({ title, description, splitIndexTitle }: Eventrops) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="group w-full flex flex-col gap-4 container mx-auto p-4 mt-4">
        <div className="flex flex-col gap-2">
          <Title text={title} splitIndex={splitIndexTitle} />
        </div>

        <div className="relative w-full flex flex-col">
          <div
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="
                  absolute left-0 top-1/2 -translate-y-1/2 
                  translate-x-[-40px] group-hover:-translate-x-4
                  opacity-0 group-hover:opacity-100
                  pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-300 ease-in-out
                  flex z-10 text-icon bg-pink-light border-1 border-outlined p-2
                  hover:text-white hover:bg-primary hover:border-primary rounded-full
                "
          >
            <ChevronLeft className="w-6 h-6" />
          </div>
          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-3 lg:gap-5 z-9 overflow-x-auto scroll-smooth py-4 h-full scrollbar-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {popularProducts?.map((product) => (
              <div key={product.id} className={clsx("flex-shrink-0 rounded")}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="
              absolute right-0 top-1/2 -translate-y-1/2 
              -translate-x-[-40px] group-hover:translate-x-4
              opacity-0 group-hover:opacity-100
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 ease-in-out
              flex z-10 text-icon bg-pink-light border-1 border-outlined p-2
            hover:text-white hover:bg-primary hover:border-primary rounded-full
            "
          >
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
