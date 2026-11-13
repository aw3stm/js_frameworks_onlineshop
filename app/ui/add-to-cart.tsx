"use client";

import Button from "./Button";
import { useCart } from "../context/cart-context";
import { Product } from "../types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Button onClick={() => addToCart(product)} className="self-start">
      Add to Cart
    </Button>
  );
}
