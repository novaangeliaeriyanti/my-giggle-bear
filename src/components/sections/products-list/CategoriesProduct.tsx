"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "All", icon: "/images/icons/service-return.png", slug: "all" },
  { name: "T-shirts", icon: "/images/icons/service-return.png", slug: "t-shirts" },
  { name: "Shoes", icon: "/images/icons/service-return.png", slug: "shoes" },
  { name: "Accessories", icon: "/images/icons/service-return.png", slug: "accessories" },
];

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
      {categories.map((category) => (
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
          <div className="flex items-center gap-1">
            <div className="text-secondary">
              {category.icon && (
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                  flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                >
                  <Image
                    src={category.icon}
                    alt={category.icon}
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
                </div>
              )}
            </div>
            <h4 className={`text-heading-1 text-stroke ${category.slug === selectedCategory ? "text-primary" : "text-secondary"}`}>{category.name}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesProduct;
