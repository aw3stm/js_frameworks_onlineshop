"use client";
import SearchBar from "./searchbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/cart-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  return (
    <header className="bg-white relative z-50 px-6 py-4 md:py-6 grid grid-cols-3 items-center max-w-screen mx-auto border-b border-gray-300/30">
      <div className="flex justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -m-2 hover:opacity-70 transition-opacity cursor-pointer"
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
      <div className="flex justify-end items-center gap-4 lg:gap-6 text-sm tracking-wide">
        <Link
          href="/"
          className="hidden md:block hover:text-gray-500 transition-colors"
        >
          Products
        </Link>
        <Link
          href="/contact"
          className="hidden md:block hover:text-gray-500 transition-colors"
        >
          Contact
        </Link>

        <button
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setIsOpen(false);
          }}
          aria-label="Search"
          aria-expanded={isSearchOpen}
          className="relative hover:opacity-70 transition-opacity cursor-pointer after:absolute after:-inset-2"
        >
          <svg
            className="block"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <Link
          href="/cart"
          className="relative flex items-center gap-2 group after:absolute after:-inset-2"
        >
          <svg
            className="block"
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
          <span className="bg-atelier-black text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            {itemCount}
          </span>
        </Link>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-atelier-beige/94 z-50 flex flex-col transition-all duration-500 ease-in-out">
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
              href="/"
              className="hover:text-gray-500 transition-colors"
            >
              Products
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
            href="/"
            className="hover:text-gray-500 transition-colors"
          >
            Products
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
      {isSearchOpen && (
        <div className="absolute top-full left-6 right-6 md:right-0 md:left-auto md:w-100 bg-white border border-white rounded-b-md shadow-xl p-4 md:p-6 z-50">
          <SearchBar onNavigate={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
