"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useCart } from "../context/cart-context";
import { Product } from "../types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [added]);

  function handleClick() {
    addToCart(product);
    setAdded(true);
    window.dispatchEvent(
      new CustomEvent("cart:add", { detail: { title: product.title } }),
    );
  }

  return (
    <Button onClick={handleClick} className="self-start">
      {added ? "Added ✓" : "Add to Cart"}
    </Button>
  );
}
