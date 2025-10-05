import ProductCard from "@/components/ui/ProductCard";
import { popularProducts } from "@/data/products";
import Link from "next/link";
import CategoriesProduct from "./CategoriesProduct";
import { Suspense } from "react";

const ProductsListSection = ({ category,params }: { category: string, params?:"homepage" | "products" }) => {
  return (
    <div className="flex justify-center">
        <div className="w-full  rounded-3xl flex flex-col lg:flex-row container mx-auto p-4">
            <div className="rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-[url(/grid-line.png)] bg-cover bg-center overflow-visible">
                <div className="flex flex-col gap-1 lg:pr-6">
                    <div className="flex items-center gap-2 logo font-bold">
                        <span className="flex space-x-2 text-secondary text-stroke-3">
                            <span>Popular</span>
                        </span>
                        <span className="flex text-primary space-x-2 text-stroke-3">
                            <span>Products</span>
                        </span>
                    </div>
                    <span className="text-description">Choose your favorite products through our collection</span>
                    <Suspense fallback={<div></div>}>
                        <CategoriesProduct />
                    </Suspense>
                    {params !== "products" && (
                      <Link
                        href={category ? `/products/?category=${category}` : "/products"}
                        className="flex text-primary text-description justify-start underline"
                      >
                        View all products
                      </Link>
                    )}
                </div>
            </div>
            <div className="py-4 rounded-bl-3xl rounded-tr-3xl rounded-br-3xl  bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2 lg:gap-5 justify-items-center">
                    {popularProducts.map((product)=>(
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductsListSection