import { cacheLife } from "next/cache";
import { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const response = await fetch("https://v2.api.noroff.dev/online-shop");
  const result = await response.json();
  return result.data;
}
