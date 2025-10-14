import { ServiceHighlightsType } from "@/types/types";

export type HeroStyle = "classic" | "modern" | "minimal";
export type ProductLayout = "grid" | "carousel" | "stacked";

export interface HomepageConfig {
  banner: string;
  heroStyle: HeroStyle;
  productLayout: ProductLayout;
}

export const homepageVariants: Record<string, HomepageConfig> = {
  home1: {
    banner: "/images/banner1.jpg",
    heroStyle: "classic",
    productLayout: "grid",
  },
  home2: {
    banner: "/images/banner2.jpg",
    heroStyle: "modern",
    productLayout: "carousel",
  },
  home3: {
    banner: "/images/banner3.jpg",
    heroStyle: "minimal",
    productLayout: "stacked",
  },
};

export const images: string[] = [
  "/images/banners/1.png",
  "/images/banners/2.png",
  "/images/banners/3.png",
];

export const ServiceHighlightsData: ServiceHighlightsType = [
  {
    id: 1,
    icon: "/images/icons/service-country.png",
    title: "We Ship All Over Country",
  },
  {
    id: 2,
    icon: "/images/icons/service-shipping.png",
    title: "Free Shipping On All Orders",
  },
  {
    id: 3,
    icon: "/images/icons/service-return.png",
    title: "Free Return",
  },
  {
    id: 4,
    icon: "/images/icons/service-ori.png",
    title: "100% Original Products",
  },
];

export const eventProducts = {
  title: "Popular Products",
  description:
    "Explore our popular products — fresh styles made to inspire your kids everyday look.",
};

export const voucher = {
  code: "KIDS20OFF",
  title: "20% Off Kidswear",
  description: "Enjoy 20% off kids’ clothing with a minimum purchase of $50 (T&C apply)",
  icon: "/images/icons/voucher.png",
  minPurchase: 50,
  discount: 20,
};

export const productListSection = {
  title: "New Arrival",
  description:
    "Discover the latest kidswear collection — playful, comfy, and stylish pieces made to brighten up your little one’s everyday look.",
};

export const categoriesProductList = [
  { name: "All", slug: "all" },
  { name: "Babies", slug: "babies" },
  { name: "Girls", slug: "girls" },
  { name: "Boys", slug: "boys" },
];

export const videoSection = {
  icon: "/images/icons/film.png",
  title: "Discover the World of Kidswear!",
  description:
    "Step into a colorful world of style and comfort with our latest kidswear collection. From playful everyday outfits to trendy looks for special occasions, every piece is made for fun, movement, and imagination. Let your little ones express themselves with fashion that’s as bright and joyful as they are!",
  videoSrc: "/videos/view.mp4",
  poster: "/images/thumbnail.webp",
};

export const reviews = {
  title: "Customer Reviews",
  description:
    "Read what other customers are saying about this product. Share your experience to help others make informed decisions.",
  items: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/images/icons/review.png",
      rating: 5,
      comment:
        "The clothes are super comfy and adorable! My little one looks so cute in every outfit. Definitely buying more soon!",
    },
    {
      id: 2,
      name: "Michael Lee",
      avatar: "/images/icons/review.png",
      rating: 5,
      comment:
        "Great quality fabrics and stylish designs. My son loves his new jacket — it fits perfectly and feels soft!",
    },
    {
      id: 3,
      name: "Amanda Rivera",
      avatar: "/images/icons/review.png",
      rating: 5,
      comment:
        "Absolutely love this store! The kidswear is well-made, colorful, and perfect for everyday wear.",
    },
    {
      id: 4,
      name: "Kevin Wong",
      avatar: "/images/icons/review.png",
      rating: 5,
      comment:
        "Perfect outfits for gifts! Fast delivery and everything arrived beautifully packed. Highly recommended!",
    },
  ],
};
