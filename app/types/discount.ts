import { Product } from "../types";

export function getDiscountPercent(product: Product): number {
  if (product.discountedPrice >= product.price) return 0;
  return Math.round((1 - product.discountedPrice / product.price) * 100);
}
