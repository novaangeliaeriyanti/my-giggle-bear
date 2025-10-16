"use client";
import ProductCard from "@/components/ui/ProductCard";
import { popularProducts } from "@/data/products";
import CategoriesProduct from "./CategoriesProduct";
import { Suspense, useMemo } from "react";
import { productListSection } from "@/data/homepage";
import { useSearchParams } from "next/navigation";

const ProductsListSection = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") return popularProducts;
    return popularProducts.filter((product) =>
      product.category?.some(
        (category) => category.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [selectedCategory]);

  return (
    <div className="flex justify-center container mx-auto p-4">
      <div className="relative w-full py-4 bg-blue-sky flex flex-col justify-center gap-4 container bg-[url('/images/icons/bg-cloud.png')] bg-contain bg-no-repeat bg-top pt-40 text-primary card-rounded overflow-visible flex items-center">
        <div className="flex flex-col gap-1 items-center">
          <h2 className="text-heading-1 text-stroke-3 mb-1 mt-1.5 text-secondary">
            {productListSection?.title}
          </h2>
          <span className="text-body">Choose your favorite products through our collection</span>
          <Suspense fallback={<div></div>}>
            <CategoriesProduct />
          </Suspense>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-10">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListSection;
