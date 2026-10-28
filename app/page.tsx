import Link from "next/link";
import { Product } from "./types";
import Image from "next/image";

export default async function Home() {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");
  const result = await response.json();

  const products: Product[] = result.data;

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16">
      <h1 className="text-3xl font-black mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col group">
            <div className="relative w-full aspect-4/5 mb-6 overflow-hidden">
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <Link href={`/product/${product.id}`}>
              <h2 className="text-lg font-medium tracking-wide mb-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3 capitalize">
                {product.tags && product.tags.length > 0
                  ? product.tags[0]
                  : "Lifestyle"}
              </p>
              <p className="text-md font-normal">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
