import { CartProvider } from "./context/cart-context";
import "./globals.css";
import Header from "./ui/header";
import AnnouncementBar from "./ui/announcement";
import { manrope } from "@/app/ui/fonts";
import Footer from "./ui/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased bg-atelier-beige text-atelier-black min-h-dvh flex flex-col`}
      >
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
