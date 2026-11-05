import type { Metadata } from "next";
import ProductCard from "../ui/product-card";
import { getProducts } from "../lib/products";

export const metadata: Metadata = {
  title: "All Products | Atelier North",
  description: "Browse the full Atelier North collection.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16">
      <div className="mb-8">
        <h1 className="text-2xl font-black">All Products</h1>
        <p className="text-sm text-black/70 mt-2">{products.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
            headingAs="h2"
          />
        ))}
      </div>
    </main>
  );
}
