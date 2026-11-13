"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import type { Product } from "../types";

const MIN_PRODUCTS_PER_FILTER = 3;

function getTags(product: Product): string[] {
  return (product.tags ?? []).map((tag) => tag.toLowerCase());
}

function getFilters(products: Product[]): string[] {
  const counts = new Map<string, number>();

  for (const product of products) {
    for (const tag of new Set(getTags(product))) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_PRODUCTS_PER_FILTER)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export default function ProductList({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const filters = getFilters(products);
  const visible = selected
    ? products.filter((product) => getTags(product).includes(selected))
    : products;

  const baseButton =
    "rounded-sm border border-atelier-details/40 px-5 py-2 text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer";

  return (
    <>
      <div
        role="group"
        aria-label="Filter products by category"
        className="flex flex-wrap gap-3 mb-6"
      >
        <button
          type="button"
          onClick={() => setSelected(null)}
          aria-pressed={selected === null}
          className={`${baseButton} ${
            selected === null
              ? "bg-atelier-button text-white"
              : "hover:bg-atelier-beige"
          }`}
        >
          All
        </button>

        {filters.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelected(tag)}
            aria-pressed={selected === tag}
            className={`${baseButton} ${
              selected === tag
                ? "bg-atelier-button text-white"
                : "hover:bg-atelier-beige"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-sm text-black/70 mb-8" aria-live="polite">
        {visible.length} products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {visible.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
            headingAs="h2"
          />
        ))}
      </div>
    </>
  );
}
