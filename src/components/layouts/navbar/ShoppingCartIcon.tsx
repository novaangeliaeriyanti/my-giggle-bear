"use client";
import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();
  if (!hasHydrated) return null;
  return (
    <Link href="/order" className="relative">
      <ShoppingCart className="border-1 border-outlined rounded-lg text-icon hover:text-hover w-7 h-7 p-1 lg:w-10 lg:h-10 lg:p-2" />
      <span className="absolute text-tiny text-white -right-3 -top-3 flex w-5 h-5 items-center justify-center rounded-full bg-secondary">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
