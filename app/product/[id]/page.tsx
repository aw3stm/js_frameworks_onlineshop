import Image from "next/image";
import { notFound } from "next/navigation";
import { Product } from "@/app/types";
import Price from "@/app/ui/price";
import { getDiscountPercent } from "@/app/types/discount";
import Rating from "@/app/ui/rating";
import AddToCartButton from "@/app/ui/add-to-cart";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
  if (!response.ok) notFound();

  const result: { data: Product } = await response.json();
  const product = result.data;
  const discount = getDiscountPercent(product);

  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16 grid gap-10 md:gap-24 md:grid-cols-[2fr_3fr]">
      <div className="relative w-full aspect-4/5 overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-6 left-3 z-10 bg-atelier-button rounded-sm text-white text-sm md:text-md px-8 py-4">
            -{discount}%
          </span>
        )}
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium tracking-wide">{product.title}</h1>

        <Price
          price={product.price}
          discountedPrice={product.discountedPrice}
        />

        <Rating rating={product.rating} />

        <p className="text-sm leading-relaxed">{product.description}</p>

        <AddToCartButton product={product} />

        {product.tags && product.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="border border-atelier-details/40 px-3 py-1 text-xs capitalize"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-medium mb-4">
              Reviews ({product.reviews.length})
            </h2>
            <ul className="flex flex-col gap-4">
              {product.reviews.map((review) => (
                <li
                  key={review.id}
                  className="border-b border-gray-300/50 pb-4"
                >
                  <p className="text-sm font-medium">
                    {review.username} · {review.rating} / 5
                  </p>
                  <p className="text-sm mt-1">{review.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
