"use client";

import Button from "@/components/ui/Button";
import { ProductType } from "@/types/types";
import useCartStore from "@/stores/cartStore";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart");
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-body">
        <span className="text-body font-bold text-secondary">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 rounded-lg ${
                selectedSize === size ? "border-gray-600" : "border-gray-300"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-7 h-7 text-small text-center flex items-center rounded-lg justify-center hover:text-hover ${
                  selectedSize === size ? "bg-primary text-white" : "bg-white text-gray-700"
                }`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2">
        <span className="text-body font-bold text-secondary">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 rounded-full ${
                selectedColor === color ? "border-primary border-2 p-[1px]" : "border-white"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className={`w-7 h-7 rounded-full`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-small">
        <span className="text-body font-bold text-secondary">Quantity</span>
        <div className="flex items-center">
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 rounded-lg text-icon hover:text-hover"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4 " />
          </button>
          <span className="font-bold text-gray-700 text-small space-md">{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 p-1 rounded-lg text-icon hover:text-hover"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <Button
        onClick={handleAddToCart}
        desc="Add to Cart"
        icon={<Plus className="w-4 h-4" />}
        className="flex justify-center items-center"
      />
      <button className="text-primary text-button px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 border border-primary ring-0 hover:border-dashed">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
