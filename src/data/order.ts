export interface Voucher {
  id: number;
  title: string;
  code: string;
  expiry: string;
  description: string;
  minSpend: number;
}

export const voucherList: Voucher[] = [
  {
    id: 1,
    title: "10% Off All Orders",
    code: "SAVE10",
    expiry: "2025-12-31",
    description: "Get 10% off your total purchase with no minimum spend.",
    minSpend: 0,
  },
  {
    id: 2,
    title: "Free Shipping",
    code: "FREESHIP",
    expiry: "2025-11-30",
    description: "Enjoy free shipping for all orders above Rp150.000.",
    minSpend: 150000,
  },
  {
    id: 3,
    title: "Rp25.000 Off",
    code: "DISC25K",
    expiry: "2025-10-31",
    description: "Get Rp25.000 off when spending at least Rp200.000.",
    minSpend: 200000,
  },
];

export const tracking = {
  orderId: "ORD-20251001-014",
  courier: "BABA Express",
  trackingNumber: "BABA123456789",
  estimatedDelivery: "October 9, 2025",
  currentStatus: "Delivered",
  timeline: [
    {
      status: "Order Placed",
      date: "October 7, 2025 - 09:12 AM",
      description: "Your order has been successfully placed and confirmed.",
      icon: "check-circle-2",
    },
    {
      status: "Package Picked Up",
      date: "October 7, 2025 - 02:30 PM",
      description: "The courier has picked up your package from the seller.",
      icon: "truck",
    },
    {
      status: "In Transit",
      date: "October 8, 2025 - 10:45 AM",
      description: "Your package is currently on its way to the destination city.",
      icon: "package",
    },
    {
      status: "Delivered",
      date: "October 9, 2025 - 11:00 AM",
      description: "Your order has been successfully delivered to your address.",
      icon: "home",
    },
  ],
};

export const orders = [
  {
    id: "ORD-20251007-001",
    date: "October 7, 2025",
    total: 106.32,
    status: "Delivered",
    items: [
      {
        id: 2,
        name: "TinyGent Classic Formal Oneset",
        qty: 1,
        sizes: "M",
        colors: "blue",
        images: "/images/products/2b.png",
        price: 47.92,
        isReview: false,
        brandId: "tinygent",
      },
      {
        id: 4,
        name: "LunaKids Polka Dot Tee",
        qty: 2,
        sizes: "S",
        colors: "pink",
        images: "/images/products/4p.png",
        price: 28.2,
        isReview: true,
        brandId: "lunakids",
      },
    ],
  },
  {
    id: "ORD-20251001-014",
    date: "October 1, 2025",
    total: 131.79,
    status: "In Transit",
    items: [
      {
        id: 8,
        name: "LunaWave Long Sleeve Blouse",
        qty: 2,
        sizes: "S",
        colors: "blue",
        images: "/images/products/8b.png",
        price: 41.93,
        isReview: false,
        brandId: "lunakids",
      },
      {
        id: 5,
        name: "LittleBear Cozy Active Set",
        qty: 1,
        sizes: "M",
        colors: "gray",
        images: "/images/products/5g.png",
        price: 47.93,
        isReview: false,
        brandId: "littlebear",
      },
    ],
  },
  {
    id: "ORD-20250922-032",
    date: "September 22, 2025",
    total: 139.76,
    status: "Cancelled",
    items: [
      {
        id: 9,
        name: "SunnyPlay Cotton Oneset",
        qty: 1,
        sizes: "S",
        colors: "pink",
        images: "/images/products/9p.png",
        price: 41.93,
        isReview: false,
        brandId: "playnest",
      },
      {
        id: 11,
        name: "Playnest CozyKnit Sweater",
        qty: 1,
        sizes: "XS",
        colors: "brown",
        images: "/images/products/11w.png",
        price: 41.93,
        isReview: false,
        brandId: "playnest",
      },
      {
        id: 1,
        name: "LunaKids Summer Sleeveless Dress",
        qty: 1,
        sizes: "S",
        colors: "orange",
        images: "/images/products/1o.png",
        price: 26,
        isReview: false,
        brandId: "lunakids",
      },
      {
        id: 6,
        name: "StripeEase Boys Shirt",
        qty: 1,
        sizes: "M",
        colors: "blue",
        images: "/images/products/6b.png",
        price: 29.9,
        isReview: false,
        brandId: "juniorlane",
      },
    ],
  },
];

export const order = {
  id: "ORD-20251007-001",
  date: "October 7, 2025",
  status: "Delivered",
  items: [
    {
      id: 2,
      name: "TinyGent Classic Formal Oneset",
      qty: 2,
      sizes: "M",
      colors: "blue",
      images: "/images/products/2b.png",
      price: 47.92,
      isReview: false,
      brandId: "tinygent",
    },
    {
      id: 4,
      name: "LunaKids Polka Dot Tee",
      qty: 1,
      sizes: "S",
      colors: "pink",
      images: "/images/products/4p.png",
      price: 28.41,
      isReview: true,
      brandId: "lunakids",
    },
  ],
  shipping: {
    name: "John Doe",
    address: "123 Main Street, New York City",
    phone: "+1 234 567 890",
    method: "Standard Shipping (3–5 days)",
  },
  payment: {
    method: "Credit Card (Visa)",
    status: "Paid",
    date: "October 7, 2025",
    total: 124.25,
  },
  voucher: {
    code: "SAVE10",
    discount: 10,
  },
};
