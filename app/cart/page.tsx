"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import Price from "../ui/price";

export default function CartPage() {
  const { items, totalPrice, quantityUpdate, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="p-8 max-w-screen-2xl mx-auto md:p-16 text-center">
        <h1 className="text-2xl font-black mb-4">Your cart</h1>
        <p className="text-sm mb-8">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block rounded-sm bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto md:p-16">
      <h1 className="text-3xl font-black mb-8">Your cart</h1>

      <ul className="flex flex-col divide-y divide-gray-400/50">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-6">
            <div className="relative w-24 h-28 shrink-0 overflow-hidden">
              <Image
                src={item.image.url}
                alt={item.image.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col grow gap-2">
              <div className="flex justify-between gap-4">
                <h2 className="font-medium">{item.title}</h2>
                <p className="text-sm whitespace-nowrap">
                  {(item.price * item.quantity).toFixed(2)} SEK
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Price
                  price={item.originalPrice}
                  discountedPrice={item.price}
                />
                <span className="text-gray-500">each</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-atelier-details/40">
                  <button
                    type="button"
                    onClick={() => quantityUpdate(item.id, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${item.title}`}
                    className="w-9 h-9 hover:bg-atelier-beige transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-9 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => quantityUpdate(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity of ${item.title}`}
                    className="w-9 h-9 hover:bg-atelier-beige transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm underline hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-gray-400/50 flex flex-col items-end gap-4">
        <p className="text-lg">
          Total:{" "}
          <span className="font-medium">{totalPrice.toFixed(2)} SEK</span>
        </p>
        <Link
          href="/checkout/success"
          className="bg-atelier-button rounded-sm text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
