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
  courier: "JNE Express",
  trackingNumber: "JNE123456789",
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
    total: 395000,
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Cotton T-shirt",
        qty: 2,
        sizes: "M",
        colors: "Gray",
        images: "/images/products/7g.png",
        price: 75000,
        isReview: false,
        brandId: "nike",
      },
      {
        id: 2,
        name: "Denim Jeans",
        qty: 1,
        sizes: "XL",
        colors: "Blue",
        images: "/images/products/8b.png",
        price: 250000,
        isReview: true,
        brandId: "levis",
      },
    ],
  },
  {
    id: "ORD-20251001-014",
    date: "October 1, 2025",
    total: 395000,
    status: "In Transit",
    items: [
      {
        id: 1,
        name: "Cotton T-shirt",
        qty: 2,
        sizes: "M",
        colors: "Gray",
        images: "/images/products/7g.png",
        price: 75000,
        isReview: false,
        brandId: "nike",
      },
      {
        id: 2,
        name: "Denim Jeans",
        qty: 1,
        sizes: "XL",
        colors: "Blue",
        images: "/images/products/8b.png",
        price: 250000,
        isReview: false,
        brandId: "levis",
      },
    ],
  },
  {
    id: "ORD-20250922-032",
    date: "September 22, 2025",
    total: 395000,
    status: "Cancelled",
    items: [
      {
        id: 1,
        name: "Cotton T-shirt",
        qty: 2,
        sizes: "M",
        colors: "Gray",
        images: "/images/products/7g.png",
        price: 75000,
        isReview: false,
        brandId: "nike",
      },
      {
        id: 2,
        name: "Denim Jeans",
        qty: 1,
        sizes: "XL",
        colors: "Blue",
        images: "/images/products/8b.png",
        price: 250000,
        isReview: false,
        brandId: "levis",
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
      id: 1,
      name: "Cotton T-shirt",
      qty: 2,
      sizes: "m",
      colors: "gray",
      images: "/images/products/7g.png",
      price: 75000,
      isReview: false,
      brandId: "nike",
    },
    {
      id: 2,
      name: "Denim Jeans",
      qty: 1,
      sizes: "xl",
      colors: "blue",
      images: "/images/products/8b.png",
      price: 250000,
      isReview: true,
      brandId: "levis",
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
    total: 395000,
  },
  voucher: {
    code: "SAVE10",
    discount: 35000,
  },
};

export const reviews = [
  {
    id: 1,
    orderId: "ORD-20251007-001",
    orderDate: "October 7, 2025",
    itemId: 1,
    name: "Cotton T-shirt",
    brandId: "nike",
    colors: "Gray",
    sizes: "M",
    images: "/images/products/7g.png",
    rating: 5,
    text: "Love this shirt! Comfortable and fits well.",
    isAnonymous: false,
  },
  {
    id: 2,
    orderId: "ORD-20251007-001",
    orderDate: "October 7, 2025",
    itemId: 2,
    name: "Denim Jeans",
    brandId: "levis",
    colors: "Blue",
    sizes: "XL",
    images: "/images/products/8b.png",
    rating: 4,
    text: "Good quality but a bit tight in the waist.",
    isAnonymous: true,
  },
  {
    id: 3,
    orderId: "ORD-20251001-014",
    orderDate: "October 1, 2025",
    itemId: 1,
    name: "Cotton T-shirt",
    brandId: "nike",
    colors: "Gray",
    sizes: "M",
    images: "/images/products/7g.png",
    rating: 3,
    text: "Average quality, color fades after wash.",
    isAnonymous: false,
  },
  {
    id: 4,
    orderId: "ORD-20250922-032",
    orderDate: "September 22, 2025",
    itemId: 2,
    name: "Denim Jeans",
    brandId: "levis",
    colors: "Blue",
    sizes: "XL",
    images: "/images/products/8b.png",
    rating: 5,
    text: "Perfect jeans! Highly recommend.",
    isAnonymous: false,
  },
];
