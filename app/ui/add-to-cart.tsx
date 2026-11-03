"use client";

import { useCart } from "../context/cart-context";
import { Product } from "../types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="self-start rounded-sm bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
