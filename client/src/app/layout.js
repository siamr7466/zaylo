import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-outfit"
});

export const metadata = {
  title: "Zaylo | Modern Fashion",
  description: "Exclusive clothing for the modern individual.",
};

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import SmoothScroll from "../components/SmoothScroll";
import Navbar from "../components/layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
