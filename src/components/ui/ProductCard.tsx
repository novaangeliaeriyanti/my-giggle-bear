"use client";
import { ProductType } from "@/types/types";
// import useCartStore from "@/stores/cartStore"
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { toast } from "react-toastify"

const ProductCard = ({ product }: { product: ProductType }) => {
  // const { addToCart } = useCartStore();

  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    // addToCart({
    //   ...product,
    //   quantity: 1,
    //   selectedSize: productTypes.size,
    //   selectedColor: productTypes.color,
    // });
    // toast.success("Product added to cart")
  };

  return (
    <div className="bg-white border-[1px] border-neutral-300 overflow-hidden w-full max-w-[150px] md:max-w-[150px] lg:max-w-[200px] flex-shrink-0 card-rounded">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[1]">
          <span className="absolute top-0 left-0 bg-pink-400 text-white rounded-br-xl font-bold p-1 lg:px-4 lg:py-2 z-10 text-xs sm:text-sm">
            50%
          </span>
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-contain hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-3 sm:p-4 lg:gap-3">
        <h1 className="font-medium line-clamp-1 text-gray-500 text-sm sm:text-base">
          {product.name}
        </h1>
        <div className="hidden md:block lg:block">
          <p className="line-clamp-2 text-xs sm:text-sm text-gray-500 ">
            {product.shortDescription}
          </p>
        </div>

        <div className="hidden lg:flex items-start gap-3 text-xs sm:text-sm">
          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-lg px-2 py-1 text-gray-500 text-xs sm:text-sm"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
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
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  className={`flex items-center cursor-pointer border-1 ${
                    productTypes.color === color
                      ? "border-gray-400"
                      : "border-gray-200"
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
        <div className="flex flex-row items-start justify-between gap-2 mt-2">
          <p className="font-bold text-gray-700 text-sm sm:text-base">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="hidden lg:flex ring-1 rounded-lg px-1 py-1 text-xs sm:text-base cursor-pointer text-white bg-pink-400 ring-pink-400 hover:text-pink-400 hover:bg-white hover:ring-pink-400 transition-all duration-300 items-center gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
