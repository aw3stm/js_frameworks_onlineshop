"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-white relative z-50 px-6 py-4 md:py-6 grid grid-cols-3 items-center max-w-screen-2xl mx-auto border-b border-gray-300/30">
      <div className="flex justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -ml-2 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="4" y1="10" x2="20" y2="10"></line>
            <line x1="4" y1="15" x2="20" y2="15"></line>
          </svg>
        </button>
      </div>

      <Link href="/" className="flex justify-center">
        <Image
          src="/images/Atelier North.svg"
          alt="Atelier North"
          width={160}
          height={40}
          className="object-contain w-auto h-auto"
        />
      </Link>

      <div className="flex justify-end items-center gap-4 lg:gap-8">
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm tracking-wide">
          <Link
            href="/search"
            className="hover:text-gray-500 transition-colors"
          >
            Search
          </Link>
          <Link href="/" className="hover:text-gray-500 transition-colors">
            All products
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-500 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <Link href="/cart" className="flex items-center gap-2 p-2 -mr-2 group">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="bg-(--atelier-black) text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            0
          </span>
        </Link>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-(--atelier-beige)/94 z-50 flex flex-col transition-all duration-500 ease-in-out">
          <div className="px-6 py-6 flex justify-between items-center border-b border-gray-300/30">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center grow gap-10 text-xl font-light tracking-wide">
            <Link
              onClick={() => setIsOpen(false)}
              href="/search"
              className="hover:text-gray-500 transition-colors"
            >
              Search
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="hover:text-gray-500 transition-colors"
            >
              All products
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/contact"
              className="hover:text-gray-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {isOpen && (
        <div className="hidden md:flex absolute top-full left-6 w-80 bg-white border border-white shadow-xl p-12 flex-col gap-5 z-50">
          <Link
            onClick={() => setIsOpen(false)}
            href="/search"
            className="hover:text-gray-500 transition-colors"
          >
            Search
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className="hover:text-gray-500 transition-colors"
          >
            All products
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/contact"
            className="hover:text-gray-500 transition-colors"
          >
            Contact
          </Link>

          <div className="h-px bg-gray-200 w-full my-2"></div>

          <Link
            onClick={() => setIsOpen(false)}
            href="/contact"
            className="hover:text-gray-500 transition-colors text-lg font-light tracking-wide"
          >
            About Atelier North
          </Link>
        </div>
      )}
    </header>
  );
}
