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
        flex justify-center items-center gap-2 md:gap-4
      "
    >
      {categoriesProductList.map((category) => (
        <div key={category.slug} onClick={() => handleChange(category.slug)}>
          <div
            className={`flex justify-center items-center text-small min-w-[50px] md:min-w-[80px] px-2 py-1 md:px-3 md:py-2 rounded-full ${category.slug === selectedCategory ? "text-white bg-primary" : "text-secondary bg-white"}`}
          >
            {category.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesProduct;
