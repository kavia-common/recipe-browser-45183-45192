import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CartProviderClient from "../context/CartProviderClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ocean Recipes",
  description: "A modern recipe browser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50"}>
        <CartProviderClient>
          {children}
        </CartProviderClient>
      </body>
    </html>
  );
}
