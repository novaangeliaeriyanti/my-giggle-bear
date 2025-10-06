import { popularProducts } from "@/data/products";

export async function getProductById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 200));
  return popularProducts.find(p => p.id === Number(id));
}
