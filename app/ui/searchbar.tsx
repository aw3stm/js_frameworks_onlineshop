"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse, Product } from "../types";
import { API_URL } from "../lib/api";

export default function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch products (${res.status})`);
        return res.json() as Promise<ApiResponse<Product[]>>;
      })
      .then((result) => setProducts(result.data))
      .catch(() => setProducts([]));
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter((product) =>
        product.title.toLowerCase().includes(trimmed),
      )
    : [];

  return (
    <div className="relative w-full max-w-xl">
      <input
        autoFocus
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products ..."
        aria-label="Search products"
        className="w-full border-b border-atelier-details/40 bg-transparent px-1 py-3 text-sm outline-none focus:border-atelier-black transition-colors"
      />

      {trimmed !== "" && (
        <ul className="mt-2 bg-white border border-gray-200 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  onClick={onNavigate}
                  className="flex items-center gap-4 p-3 hover:bg-atelier-beige transition-colors"
                >
                  <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    width={48}
                    height={48}
                    className="object-cover w-12 h-12"
                  />
                  <span className="text-sm">{product.title}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-4 text-sm text-gray-500">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
}
