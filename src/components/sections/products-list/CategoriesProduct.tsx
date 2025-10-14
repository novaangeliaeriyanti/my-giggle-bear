"use client";

import { categoriesProductList } from "@/data/homepage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoriesProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className="
        flex flex-row lg:flex-col
        md:gap-5
        overflow-x-auto lg:overflow-visible
        scrollbar-hidden
        container mx-auto
      "
    >
      {categoriesProductList.map((category) => (
        <div
          key={category.slug}
          onClick={() => handleChange(category.slug)}
          className={`
            group relative cursor-pointer flex-shrink-0
            flex items-center justify-center
            text-center
            min-w-[150px] lg:min-w-[200px]
            bg-[url('/images/icons/cloud.png')]
            bg-no-repeat bg-center bg-contain
            aspect-[4/2]
            transition-transform duration-300 hover:scale-105
          `}
        >
          <h4
            className={`text-heading-1 text-stroke ${category.slug === selectedCategory ? "text-primary" : "text-secondary"}`}
          >
            {category.name}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default CategoriesProduct;
