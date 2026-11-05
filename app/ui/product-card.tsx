import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";
import { getDiscountPercent } from "../types/discount";
import Price from "./price";
import Rating from "./rating";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  headingAs?: "h2" | "h3";
};

export default function ProductCard({
  product,
  priority = false,
  headingAs: Heading = "h3",
}: ProductCardProps) {
  const discount = getDiscountPercent(product);

  return (
    <Link href={`/product/${product.id}`} className="flex flex-col group">
      <div className="relative w-full aspect-4/5 mb-6 overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-atelier-button rounded-sm text-white text-xs md:text-sm px-6 py-3 md:px-8 md:py-3">
            -{discount}%
          </span>
        )}
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <Heading className="text-lg font-medium tracking-wide mb-1">
        {product.title}
      </Heading>
      <p className="text-sm text-atelier-black mb-3 capitalize">
        {product.tags && product.tags.length > 0
          ? product.tags[0]
          : "Lifestyle"}
      </p>
      <Price price={product.price} discountedPrice={product.discountedPrice} />
      <Rating rating={product.rating} />
    </Link>
  );
}
