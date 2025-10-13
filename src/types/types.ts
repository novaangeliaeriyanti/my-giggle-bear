import z from "zod";

export type ServiceHighlightType = {
  id: string | number;
  title: string;
  icon: string;
};

export type ServiceHighlightsType = ServiceHighlightType[];

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  discount?: number;
  priceDiscount?: number;
  isFlashsale?: boolean;
  brandId: string;
  category: string[];
  subcategory: string[];
  rating?: string;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card number must be exactly 16 digits")
    .max(16, "Card number must be exactly 16 digits"),
  expirationDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format!"),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  updateQuantity: (product: CartItemType, qty: number) => void;
  clearCart: () => void;
};

export type OrderStoreStateType = {
  orders: CartItemType[];
  hasHydrated: boolean;
};

export type OrderStoreActionsType = {
  addOrder: (item: CartItemType) => void;
  removeOrder: (item: CartItemType) => void;
  clearOrders: () => void;
  updateQuantity: (item: CartItemType, qty: number) => void;

  calcSubtotal: () => number;
  calcDiscount: (percentage: number) => number;
  calcTotal: (shipping: number, discountPercent: number) => number;
  totalItems: () => number;
};

export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .regex(/^[0-9+()\-\s]+$/, "Invalid phone number format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    dateOfBirth: z
      .string()
      .nonempty("Date of birth is required")
      .refine((val) => new Date(val) <= new Date(), {
        message: "Date of birth cannot be in the future",
      }),
    hasKid: z.enum(["Yes", "No"]),
    kidAge: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || Number(val) >= 1, {
        message: "Please select a valid kid age",
      }),
  })
  .refine(
    (data) => {
      if (data.hasKid === "Yes" && !data.kidAge) return false;
      return true;
    },
    {
      message: "Kid age is required if you have a kid",
      path: ["kidAge"],
    }
  );

export type RegisterFormInputs = z.infer<typeof registerFormSchema>;

export interface Review {
  id: number;
  productId: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}
