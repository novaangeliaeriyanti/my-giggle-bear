"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import ProductInteraction from "./ProductInteraction";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/lib/api";
import ProductDescription from "./ProductDescription";
import ShareButton from "./ShareButton";
import ReviewSection from "./ReviewSection";
import RelatedProducts from "./RelatedProducts";
import PageTitle from "@/components/ui/PageTitle";

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
      <div className="flex justify-center items-center h-64 text-body">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );

  const size = searchParams.get("size") || product.sizes[0];
  const color = searchParams.get("color") || product.colors[0];

  return (
    <div className="flex flex-col gap-4 md:gap-12 container mx-auto p-4 lg:py-6">
      <PageTitle title="Product Details" />
      <div className="flex flex-col gap-4 lg:flex-row md:gap-12">
        <div className="w-full h-fit lg:max-w-5/12 aspect-[1] overflow-hidden card-rounded bg-gray-light relative lg:sticky lg:top-36">
          {product.discount && (
            <h4 className="absolute top-0 left-0 z-10 font-bold bg-primary/5 text-primary border-gray-200 rounded-br-xl p-2">
              {product.discount}%
            </h4>
          )}
          <Image
            src={product.images[color]}
            alt={product.name}
            fill
            className="object-contain card-rounded z-0"
          />
        </div>
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          <h3 className="text-gray-700 font-bold">{product.name}</h3>
          {product?.isFlashsale && (
            <div className="bg-primary text-white px-2 py-1 text-body w-fit card-rounded">
              flashsale
            </div>
          )}
          <ShareButton />
          <ProductDescription description={product.description} />
          {product.discount ? (
            <div className="flex items-center">
              <h3>${product?.priceDiscount?.toFixed(2)}</h3>
              <span className="ml-2 line-through text-small">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <h3>${product.price.toFixed(2)}</h3>
          )}
          <ProductInteraction product={product} selectedSize={size} selectedColor={color} />
          <ReviewSection productId="prod-001" />
        </div>
      </div>
      <RelatedProducts title="Related Products" />
    </div>
  );
};

export default ProductDetail;
