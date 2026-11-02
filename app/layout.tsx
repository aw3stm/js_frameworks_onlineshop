import "./globals.css";
import Header from "./ui/header";
import { manrope } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased bg-atelier-beige text-atelier-black`}
      >
        <div className=" bg-atelier-details text-white text-[10px] sm:text-xs text-center py-2 md:py-3 tracking-[0.2em] uppercase">
          Free delivery on orders over 500 SEK
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
