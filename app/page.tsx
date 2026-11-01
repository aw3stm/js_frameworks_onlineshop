import Link from "next/link";
import { Product } from "./types";
import Image from "next/image";
import Price from "./ui/price";
import { getDiscountPercent } from "./types/discount";

export default async function Home() {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");
  const result = await response.json();

  const products: Product[] = result.data;

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16">
      <h1 className="text-3xl font-black mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product, index) => {
          const discount = getDiscountPercent(product);

          return (
            <div key={product.id} className="flex flex-col group">
              <div className="relative w-full aspect-4/5 mb-6 overflow-hidden">
                {discount > 0 && (
                  <span className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-2 py-1">
                    -{discount}%
                  </span>
                )}
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <Link href={`/product/${product.id}`}>
                <h2 className="text-lg font-medium tracking-wide mb-1">
                  {product.title}
                </h2>
                <p className="text-sm text-atelier-black mb-3 capitalize">
                  {product.tags && product.tags.length > 0
                    ? product.tags[0]
                    : "Lifestyle"}
                </p>
                <Price
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
