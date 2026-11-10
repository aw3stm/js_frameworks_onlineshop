import { cacheLife } from "next/cache";
import { Product } from "../types";

const API_URL = "https://v2.api.noroff.dev/online-shop";

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  const result = await response.json();
  return result.data;
}

export async function getProduct(id: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");

  const response = await fetch(`${API_URL}/${id}`);

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Failed to fetch product (${response.status})`);
  }

  const result = await response.json();
  return result.data;
}
