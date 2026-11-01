import { Product } from "../types";

export default function Price({
  price,
  discountedPrice,
}: Pick<Product, "price" | "discountedPrice">) {
  const hasDiscount = discountedPrice < price;

  if (!hasDiscount) return <p>{price} SEK</p>;
  return (
    <p className="flex gap-2 items-baseline-last">
      <span className="font-medium">{discountedPrice} SEK</span>
      <span className="text-sm line-through text-gray-400">{price} SEK</span>
    </p>
  );
}
