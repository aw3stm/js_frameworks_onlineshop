import "./globals.css";
import Link from "next/link";
import { manrope } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
   <body className={`${manrope.className} antialiased bg-(--atelier-beige) text-(--atelier-black)`}>

        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl tracking-wider">
            Atelier North
          </Link>

          <nav className="flex gap-6 font-semibold">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Contact
            </Link>
            <Link href="/cart" className="hover:text-blue-500">
              Shopping bag(0)
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
