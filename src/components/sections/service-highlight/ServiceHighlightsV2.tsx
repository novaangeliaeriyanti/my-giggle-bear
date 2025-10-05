"use client";

import Image from "next/image";
import { ServiceHighlightsData } from "@/data/homepage";

const ServiceHighlightsV2 = () => {
  return (
    <div className="flex justify-center container mx-auto p-4 lg:px-0">
      <div className="flex w-full max-w-7xl mx-auto flex-wrap gap-4">
        {ServiceHighlightsData.map((item) => (
          <div
              key={item.id}
              className="
                flex-1
                flex flex-col items-center justify-center
                rounded-xl
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
                  w-6 h-6 
                  sm:w-8 sm:h-8
                  md:w-8 md:h-8
                "
              />
              <span className="text-sm md:text-base text-gray-500">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlightsV2;
