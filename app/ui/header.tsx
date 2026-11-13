"use client";
import SearchBar from "./searchbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/cart-context";

const mainLinks = [
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];
const aboutLink = { href: "/about", label: "About Atelier North" };
const mobileLinks = [...mainLinks, aboutLink];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen && !isSearchOpen) return;

    function handleClick(e: MouseEvent) {
      const target = e.target as Node;

      const insideMenu =
        mobileMenuRef.current?.contains(target) ||
        desktopMenuRef.current?.contains(target) ||
        menuButtonRef.current?.contains(target);

      if (isOpen && !insideMenu) {
        setIsOpen(false);
      }

      if (
        isSearchOpen &&
        !searchRef.current?.contains(target) &&
        !searchButtonRef.current?.contains(target)
      ) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSearchOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <header className="bg-white sticky top-0 z-40 w-full px-6 py-4 md:py-6 grid grid-cols-3 items-center max-w-screen mx-auto border-b border-gray-300/30">
      <div className="flex justify-start">
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -m-2 hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
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
        {mainLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hidden md:block hover:text-gray-500 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <button
          ref={searchButtonRef}
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

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        aria-hidden={!isOpen}
        className={`md:hidden fixed inset-0 z-50 flex flex-col bg-atelier-beige transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 grid grid-cols-3 items-center border-b border-gray-300/30">
          <div className="flex justify-start">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -m-2 hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Close menu"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="19" y2="19"></line>
                <line x1="19" y1="5" x2="5" y2="19"></line>
              </svg>
            </button>
          </div>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex justify-center"
          >
            <Image
              src="/images/Atelier North.svg"
              alt="Atelier North"
              width={160}
              height={40}
              className="object-contain w-auto h-auto"
            />
          </Link>
          <div />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-8 flex flex-col">
          <div className="mb-8">
            {isOpen && <SearchBar onNavigate={() => setIsOpen(false)} />}
          </div>

          <nav aria-label="Main" className="flex flex-col">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-5 border-b border-b-atelier-button/30 text-lg font-light tracking-wide"
              >
                <span>{link.label}</span>
                <span
                  aria-hidden
                  className="text-lg text-atelier-details transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 text-lg tracking-wide"
            >
              <span>Cart</span>
              <span className="bg-atelier-button text-white text-[10px] w-8 h-8 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </Link>
          </div>

          <div className="mt-auto pt-10 flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-atelier-button">
            <span>Free delivery on orders over 500 SEK</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={desktopMenuRef}
          className="hidden md:flex absolute top-full left-6 w-80 bg-white border border-white shadow-xl p-12 flex-col gap-5 z-50"
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsOpen(false)}
              href={link.href}
              className="hover:text-gray-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-gray-200 w-full my-2"></div>

          <Link
            onClick={() => setIsOpen(false)}
            href={aboutLink.href}
            className="hover:text-gray-500 transition-colors text-lg font-light tracking-wide"
          >
            {aboutLink.label}
          </Link>
        </div>
      )}

      {isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute top-full left-6 right-6 md:right-0 md:left-auto md:w-100 bg-white border border-white rounded-b-md shadow-xl p-4 md:p-6 z-50"
        >
          <SearchBar onNavigate={() => setIsSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
