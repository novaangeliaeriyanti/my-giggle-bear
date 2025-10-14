"use client";
import { ProductType } from "@/types/types";
import useCartStore from "@/stores/cartStore";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCartStore();

  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = ({ type, value }: { type: "size" | "color"; value: string }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="bg-white border-[1px] border-gray-200 overflow-hidden w-full h-full max-w-[150px] md:max-w-[150px] lg:max-w-[200px] flex-shrink-0 card-rounded">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[1] bg-gray-light">
          {product.discount && (
            <div className="absolute top-0 left-0 text-tiny font-bold bg-pink-light text-primary border-gray-200 rounded-br-xl p-1 lg:px-4 lg:py-2 z-10">
              {product.discount}%
            </div>
          )}
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-contain hover:scale-105 transition-all duration-300"
          />
          <div className="absolute bottom-0 left-0 flex items-center">
            {product?.rating && (
              <div className="flex items-center text-tiny font-bold bg-yellow-50 text-yellow-500 px-2 py-1 gap-1">
                <Star size={12} fill="currentColor" />
                {product?.rating}
              </div>
            )}
            {product?.isFlashsale && (
              <div className="text-tiny font-bold bg-pink-light text-primary px-2 py-1">
                flashsale
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-3 sm:p-4 lg:gap-3">
        <h4 className="line-clamp-1">{product.name}</h4>
        <div className="hidden md:block lg:block">
          <p className="line-clamp-2 text-tiny text-gray-500 ">{product.shortDescription}</p>
        </div>

        <div className="hidden lg:flex items-start gap-3 text-tiny">
          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-lg px-2 py-1 text-tiny"
              onChange={(e) => handleProductType({ type: "size", value: e.target.value })}
            >
              {product?.sizes?.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product?.colors?.map((color) => (
                <div
                  key={color}
                  onClick={() => handleProductType({ type: "color", value: color })}
                  className={`flex items-center cursor-pointer border-1 ${
                    productTypes.color === color ? "border-primary" : "border-gray-200"
                  } rounded-full p-[1px]`}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price and add to cart button */}
        <div className={`flex flex-row items-start justify-between gap-2`}>
          {product.discount ? (
            <div className="flex flex-col justify-start items-start">
              <span className="font-bold text-gray-700 text-small">
                ${product?.priceDiscount?.toFixed(2)}
              </span>
              <span className="line-through text-tiny">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-bold text-gray-700 text-small">${product.price.toFixed(2)}</span>
          )}
          <div
            onClick={handleAddToCart}
            className="
              hidden lg:flex 
              rounded-lg p-1 cursor-pointer 
              text-tiny text-white bg-primary 
              border-primary border-1 ring-0
              hover:text-primary hover:bg-primary/5 
              hover:ring-0 hover:border-1 hover:border-dashed hover:border-primary 
              transition-all duration-300 
              items-center gap-1
            "
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
