"use client";
import ProductCard from "@/components/ui/ProductCard";
import { popularProducts } from "@/data/products";
import CategoriesProduct from "./CategoriesProduct";
import { Suspense, useMemo } from "react";
import Title from "@/components/ui/Title";
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
    <div className="flex justify-center">
      <div className="w-full  rounded-3xl flex flex-col lg:flex-row container mx-auto p-4">
        <div className="rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-[url(/grid-line.png)] bg-[length:720px] bg-center overflow-visible">
          <div className="flex flex-col gap-1 lg:pr-6">
            <Title text={productListSection?.title} />
            <span className="text-body">Choose your favorite products through our collection</span>
            <Suspense fallback={<div></div>}>
              <CategoriesProduct />
            </Suspense>
          </div>
        </div>
        <div className="py-4 rounded-bl-3xl rounded-tr-3xl rounded-br-3xl  bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xxl:grid-cols-5 gap-2 md:gap-2 lg:gap-5  justify-items-center">
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
