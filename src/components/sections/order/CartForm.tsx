"use client";

import Checkbox from "@/components/ui/Checkbox";
import useCartStore from "@/stores/cartStore";
import useOrderStore from "@/stores/orderStore";
import { CartItemType } from "@/types/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const CartForm = () => {
  const { cart, hasHydrated, removeFromCart, updateQuantity } = useCartStore();
  const { orders, addOrder, removeOrder } = useOrderStore();

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newChecked: Record<string, boolean> = {};
    orders.forEach((item) => {
      const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      newChecked[key] = true;
    });
    setCheckedItems(newChecked);
  }, [orders]);

  const groupedCart = cart.reduce(
    (acc, item) => {
      if (!acc[item.brandId]) acc[item.brandId] = [];
      acc[item.brandId].push(item);
      return acc;
    },
    {} as Record<string, typeof cart>
  );

  const toggleCheck = (item: CartItemType) => {
    const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
    const isChecked = !checkedItems[key];
    setCheckedItems((prev) => ({ ...prev, [key]: isChecked }));

    if (isChecked) addOrder(item);
    else removeOrder(item);
  };

  const toggleCheckAllBrand = (brand: string, value: boolean) => {
    const items = groupedCart[brand];
    const newChecked = { ...checkedItems };
    items.forEach((item) => {
      const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      newChecked[key] = value;
      if (value) addOrder(item);
      else removeOrder(item);
    });
    setCheckedItems(newChecked);
  };

  if (!hasHydrated) return null;

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(groupedCart).map(([brand, items]) => {
        const allChecked = items.every(
          (item) => checkedItems[`${item.id}-${item.selectedSize}-${item.selectedColor}`]
        );
        return (
          <div key={brand} className="px-2 flex flex-col gap-4">
            {/* Brand Header */}
            <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg border border-yellow-400 border-dashed">
              <Checkbox
                checked={allChecked}
                onChange={() => toggleCheckAllBrand(brand, !allChecked)}
              />
              <h4 className="font-bold">{brand}</h4>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-4 pl-2">
              {items.map((item) => {
                const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                return (
                  <div className="flex items-center justify-between rounded-lg" key={key}>
                    <div className="flex gap-4 items-center">
                      <Checkbox checked={!!checkedItems[key]} onChange={() => toggleCheck(item)} />
                      <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0 bg-gray-light">
                        {item.discount && (
                          <div className="absolute top-0 left-0 text-tiny font-bold bg-pink-50 text-primary rounded-br-xl p-1 z-10">
                            {item.discount}%
                          </div>
                        )}
                        <Image
                          src={item.images[item.selectedColor]}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-body text-gray-700">{item.name}</span>
                        {item.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="text-small font-bold text-gray-700">
                              ${item.priceDiscount?.toFixed(2)}
                            </span>
                            <span className="line-through text-tiny">${item.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-bold">${item.price.toFixed(2)}</span>
                        )}
                        <div className="flex gap-2 text-small flex-col">
                          <span>
                            Size: {item.selectedSize.toUpperCase()}, Color: {item.selectedColor}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <button
                          className="cursor-pointer border-1 border-gray-300 p-1 rounded-lg text-icon hover:text-hover"
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4 " />
                        </button>
                        <div className="text-small font-bold space-xs">{item.quantity}</div>
                        <button
                          className="cursor-pointer border-1 border-gray-300 p-1 rounded-lg text-icon hover:text-hover"
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4 " />
                        </button>
                      </div>
                      <Trash2
                        onClick={() => removeFromCart(item)}
                        className="w-4 h-4 text-icon hover:text-primary cursor-pointer"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartForm;
