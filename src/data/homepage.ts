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
  '/images/banners/banner.webp',
  '/images/banners/banner1.webp',
  '/images/banners/banner2.webp',
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

export const voucher = {
  code: "GG50OFF",
  title: "Voucher Diskon 50%",
  description: "Voucher 199K min. purchase 549K (T&C applied)",
  icon: "/images/icons/voucher.png",
  minPurchase: 549000,
  discount: 50,
};

export const videoSection = {
  title: "Welcome to Kidz Station!",
  description:
    "Kidz Station is the most explorative toy store that offers a unique experience for play where parents & kids can team up together. Let your imagination run as you embark on a new adventure filled with thrills and excitement. Welcome to Kidz Station Imagine Play",
  videoSrc: "/videos/video.mp4",
  poster: "/thumbnail.webp",
};



