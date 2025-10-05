"use client";

import Image from "next/image";
import { ServiceHighlightsData } from "@/data/homepage";

const ServiceHighlights = () => {
  return (
      <div className="flex w-full container mx-auto flex-wrap">
        {ServiceHighlightsData.map((item) => (
          <div
            key={item.id}
            className="
              flex-1 min-w-[150px] md:min-w-[200px]
              bg-[url('/images/icons/cloud.png')]
              bg-no-repeat bg-center bg-contain
              aspect-[4/2]
              flex flex-col items-center justify-center
              text-pink-400 font-bold
            "
          >
            <div className="flex items-center justify-center gap-2 px-4 lg:px-6">
              <Image
                src={item.icon}
                alt={item.title}
                width={50}
                height={50}
                className="
                  object-contain
                  transition-transform duration-500 group-hover:scale-110
                  w-8 h-8 
                  sm:w-10 sm:h-10
                  md:w-12 md:h-12
                "
              />
              <span className="text-sm md:text-base text-secondary font-bold text-heading-1 text-stroke">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
  );
};

export default ServiceHighlights;
