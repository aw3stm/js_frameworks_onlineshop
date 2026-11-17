import type { Metadata } from "next";
import CheckoutForm from "../ui/checkout-form";

export const metadata: Metadata = {
  title: "Checkout | Atelier North",
};

export default function CheckoutPage() {
  return (
    <main className="p-8 max-w-6xl mx-auto md:p-16">
      <h1 className="text-3xl font-black mb-2">Checkout</h1>
      <p className="text-sm text-gray-500 mb-10">
        Fill in your details to complete your order.
      </p>
      <CheckoutForm />
    </main>
  );
}
