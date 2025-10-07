'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import ProductCard from '../ui/ProductCard';
import { popularProducts } from '@/data/products';

export default function EventProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex justify-center">
      <div className="group w-full flex flex-col gap-4 container mx-auto p-4 mt-4">
        <div className='flex flex-col gap-1'>
          <div className="flex items-center">
            <h2 className="text-secondary">Popular</h2>
            <h2 className="text-primary space-xs">Products</h2>
          </div>
          <span className="text-body">Choose your favorite products through our collection</span>
        </div>        

        <div className='relative w-full flex flex-col'>
          <div className="absolute rounded-3xl top-0 left-0 h-full w-full block z-0">
            <Image
              src="/images/banners/event-banner.avif"
              alt="Background Visual"
              className="h-full w-[240px] object-cover rounded-3xl"
              width={240}
              height={360}
            />
          </div>
          <button
                onClick={() => scroll("left")}
                aria-label="Scroll Left"
                className="
                  absolute left-0 top-1/2 -translate-y-1/2 
                  translate-x-[-40px] group-hover:translate-x-0
                  opacity-0 group-hover:opacity-100
                  pointer-events-none group-hover:pointer-events-auto
                  transition-all duration-300 ease-in-out
                  flex z-10 text-primary border-2 border-dashed border-primary p-2
                  hover:text-white hover:bg-primary rounded-full
                "
              >
                <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-3 lg:gap-5 z-9 overflow-x-auto scroll-smooth py-4 h-full scrollbar-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {popularProducts?.map((product, index) => (
              <div
                key={product.id}
                className={clsx(
                  "flex-shrink-0 rounded",
                  index === 0 && "ml-24 lg:ml-32"
                )}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="
              absolute right-0 top-1/2 -translate-y-1/2 
              -translate-x-[-40px] group-hover:translate-x-0
              opacity-0 group-hover:opacity-100
              pointer-events-none group-hover:pointer-events-auto
              transition-all duration-300 ease-in-out
              flex z-10 text-primary border-2 border-dashed border-primary p-2
              hover:text-white hover:bg-primary rounded-full
            "
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}