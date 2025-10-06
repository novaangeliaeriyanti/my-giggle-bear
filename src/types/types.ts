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
};  

export type ProductsType = ProductType[];