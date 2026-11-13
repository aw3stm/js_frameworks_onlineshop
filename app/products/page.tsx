import type { Metadata } from "next";
import { getProducts } from "../lib/products";
import ProductList from "../ui/product-list";

export const metadata: Metadata = {
  title: "All Products | Atelier North",
  description: "Browse the full Atelier North collection.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16">
      <h1 className="text-2xl font-black mb-8">All Products</h1>
      <ProductList products={products} />
    </main>
  );
}
