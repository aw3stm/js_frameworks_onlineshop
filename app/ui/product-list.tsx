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

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "name-asc", label: "Name: A-Z" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
    case "price-desc":
      return sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
      return products;
  }
}

export default function ProductList({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");

  const filters = getFilters(products);
  const filtered = selected
    ? products.filter((product) => getTags(product).includes(selected))
    : products;
  const visible = sortProducts(filtered, sort);

  const baseButton =
    "rounded-sm border border-atelier-details/40 px-5 py-2 text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer";

  return (
    <>
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-start md:justify-between">
        <div
          role="group"
          aria-label="Filter products by category"
          className="flex flex-wrap gap-3"
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

        <div className="flex items-center gap-3 md:shrink-0">
          <label
            htmlFor="sort"
            className="text-xs tracking-[0.2em] uppercase text-black/70"
          >
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-sm border border-atelier-details/40 bg-transparent py-2 pl-4 pr-10 text-xs tracking-[0.2em] uppercase cursor-pointer outline-none transition-colors focus-visible:border-atelier-black"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
            >
              <path d="M5 7.5l5 5 5-5" />
            </svg>
          </div>
        </div>
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
