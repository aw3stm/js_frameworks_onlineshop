"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import Price from "../ui/price";
import FlowerLine from "../ui/one-line-flower";

export default function CartPage() {
  const { items, totalPrice, quantityUpdate, removeFromCart, isLoaded } =
    useCart();
  if (!isLoaded) return null;

  if (items.length === 0) {
    return (
      <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-8 py-24">
        <FlowerLine cy={580} />

        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-atelier-button/50">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-black">Your cart is empty</h1>
          <p className="mb-10 text-sm leading-relaxed">
            Discover our collection and find something you love.
          </p>

          <Link
            href="/products"
            className="inline-block rounded-sm bg-atelier-button text-white px-8 py-3 text-sm tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
          >
            Continue shopping
          </Link>
        </div>
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

        <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/products"
            className="rounded-sm border border-atelier-details/40 px-8 py-3 text-center text-sm tracking-[0.2em] uppercase hover:bg-atelier-beige transition-colors"
          >
            Continue shopping
          </Link>

          <Link
            href="/checkout"
            className="rounded-sm bg-atelier-button px-8 py-3 text-center text-sm tracking-[0.2em] text-white uppercase hover:opacity-80 transition-opacity"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
