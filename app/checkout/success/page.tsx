"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/cart-context";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  useEffect(() => {
    if (items.length > 0) clearCart();
  }, [items.length, clearCart]);

  return (
    <main className="p-8 max-w-screen mx-auto md:p-16 text-center">
      <h1 className="text-xl font-black mb-4">Thank you for your order!</h1>
      <p className="text-sm mb-8">
        Your order has been confirmed. A confirmation is on its way to you.
      </p>
      <Link
        href="/"
        className="inline-block bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity rounded-sm"
      >
        Continue shopping
      </Link>
    </main>
  );
}
