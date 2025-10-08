import { CartItemType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderStoreState = {
  orders: CartItemType[];
  hasHydrated: boolean;
};

type OrderStoreActions = {
  addOrder: (item: CartItemType) => void;
  removeOrder: (item: CartItemType) => void;
  clearOrders: () => void;
  updateQuantity: (item: CartItemType, qty: number) => void;

  calcSubtotal: () => number;
  calcDiscount: (percentage: number) => number;
  calcTotal: (shipping: number, discountPercent: number) => number;
  totalItems: () => number;
};

const useOrderStore = create<OrderStoreState & OrderStoreActions>()(
  persist(
    (set, get) => ({
      orders: [],
      hasHydrated: false,

      addOrder: (item) =>
        set((state) => {
          const exists = state.orders.some(
            (i) =>
              i.id === item.id &&
              i.selectedSize === item.selectedSize &&
              i.selectedColor === item.selectedColor
          );
          if (exists) return state;
          return { orders: [...state.orders, item] };
        }),

      removeOrder: (item) =>
        set((state) => ({
          orders: state.orders.filter(
            (i) =>
              !(
                i.id === item.id &&
                i.selectedSize === item.selectedSize &&
                i.selectedColor === item.selectedColor
              )
          ),
        })),

      clearOrders: () => set({ orders: [] }),

      updateQuantity: (item, qty) =>
        set((state) => ({
          orders: state.orders.map((i) =>
            i.id === item.id &&
            i.selectedSize === item.selectedSize &&
            i.selectedColor === item.selectedColor
              ? { ...i, quantity: qty }
              : i
          ),
        })),

      calcSubtotal: () =>
        get().orders.reduce((acc, item) => {
          const price = item.priceDiscount ?? item.price;
          return acc + price * item.quantity;
        }, 0),

      calcDiscount: (percentage) =>
        get().orders.reduce((acc, item) => {
          const price = item.priceDiscount ?? item.price;
          return acc + (price * item.quantity * percentage) / 100;
        }, 0),

      calcTotal: (shipping, discountPercent) => {
        const subtotal = get().calcSubtotal();
        const discount = subtotal * (discountPercent / 100);
        return subtotal - discount + shipping;
      },

      totalItems: () => get().orders.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "order-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);

export default useOrderStore;
