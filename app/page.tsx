import Link from "next/link";
import Image from "next/image";
import ProductCard from "./ui/product-card";
import { getProducts } from "./lib/products";
import PromoBanner from "./ui/promo-banner";

const GRID_CLASSES =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16";
const FEATURED_COUNT = 8;

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, FEATURED_COUNT);
  const firstRow = featured.slice(0, 4);
  const secondRow = featured.slice(4, 8);

  return (
    <>
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white flex flex-col justify-center p-8 md:p-16 lg:p-24 xl:pl-[10vw]">
          <div className="max-w-xl text-0000">
            <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 text-black/80">
              Autumn / Winter 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Ready for a <br /> cozy season?
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed text-black/90">
              Wrap up in our softest knits and warmest layers. Everything you
              need to embrace the chill and make the most of the shorter days.
            </p>

            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <Link
                href="/products"
                className="text-white bg-atelier-details/80 py-4 px-8 text-sm rounded-sm font-bold uppercase tracking-wider hover:text-white/70 transition-colors"
              >
                Shop the collection
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-100 md:h-auto min-h-[60vh]">
          <Image
            src="https://images.unsplash.com/photo-1604632254231-004e0f122067?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            alt="Cozy autumn fashion"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <main
        id="products"
        className="p-8 max-w-screen-2xl mx-auto md:p-16 scroll-mt-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black">New in</h2>
          <Link
            href="/products"
            className="text-md font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            View all products →
          </Link>
        </div>

        <div className={GRID_CLASSES}>
          {firstRow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="my-16 md:my-24">
          <PromoBanner
            image="/images/serum_4.jpg"
            imageAlt="Serum bottle on red water beads"
            eyebrow="Featured"
            title="Serum"
            text="Short text about the serum goes here."
            href="/products"
            cta="Shop the serum"
          />
        </div>

        <div className={GRID_CLASSES}>
          {secondRow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-16">
          <Link
            href="/products"
            className="border border-black py-4 px-12 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-atelier-button hover:text-white transition-colors"
          >
            View all products
          </Link>
          <p className="text-sm text-black/70">
            Showing {featured.length} of {products.length} products
          </p>
        </div>
      </main>
    </>
  );
}
