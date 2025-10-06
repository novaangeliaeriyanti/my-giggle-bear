"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import ProductInteraction from "./ProductInteraction";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/lib/api";
import ProductDescription from "./ProductDescription";
import ShareButton from "./ShareButton";

const ProductDetail = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(params.id);
      if (!data) {
        setIsNotFound(true);
        return;
      }
      setProduct(data);
    }
    fetchProduct();
  }, [params.id]);

  if (isNotFound) {
    router.push("/not-found");
    return null;
  }

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );

  const size = searchParams.get("size") || product.sizes[0];
  const color = searchParams.get("color") || product.colors[0];

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 container mx-auto p-4 lg:py-6">
      <div className="w-full lg:w-5/12 relative aspect-[2/3] overflow-hidden card-rounded">
        {product.discount && (
          <div className="absolute top-0 left-0 z-10 bg-pink-50 text-primary border-gray-200 rounded-br-xl font-bold p-2 logo">
            {product.discount}%
          </div>
        )}
        <Image
          src={product.images[color]}
          alt={product.name}
          fill
         className="object-contain card-rounded z-0"
        />
      </div>

      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl text-gray-700 font-bold">{product.name}</h1>
        { product?.isFlashsale && <div className="bg-yellow-50 text-yellow-500 px-2 py-1 text-description w-fit font-bold card-rounded border">flashsale</div> }
        <ShareButton />
        <ProductDescription description={product.description} />
        {product.discount ? (
          <div className="flex items-center">
            <span className="text-xl text-gray-700 font-bold">
              ${product?.priceDiscount?.toFixed(2)}
            </span>
            <span className="ml-2 line-through text-gray-400">
              ${product.price.toFixed(2)}
            </span>
          </div>
          ) : (
            <span className="text-xl text-gray-700 font-bold">${product.price.toFixed(2)}</span>
        )}
        <ProductInteraction
          product={product}
          selectedSize={size}
          selectedColor={color}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
