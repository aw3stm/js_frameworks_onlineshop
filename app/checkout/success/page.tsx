"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cart-context";

const CHECKOUT_FLAG = "atelier-north-checkout";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let hasFlag = false;
    try {
      hasFlag = sessionStorage.getItem(CHECKOUT_FLAG) === "true";
    } catch {}

    if (hasFlag) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllowed(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  useEffect(() => {
    if (allowed && items.length > 0) clearCart();
  }, [allowed, items.length, clearCart]);

  if (!allowed) return null;

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16 text-center">
      <h1 className="text-xl font-black mb-4">Thank you for your order!</h1>
      <p className="text-sm mb-8">
        Your order has been confirmed. A confirmation is on its way to you.
      </p>
      <Link
        href="/"
        onClick={() => {
          try {
            sessionStorage.removeItem(CHECKOUT_FLAG);
          } catch {}
        }}
        className="inline-block bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity rounded-sm"
      >
        Continue shopping
      </Link>
    </main>
  );
}
