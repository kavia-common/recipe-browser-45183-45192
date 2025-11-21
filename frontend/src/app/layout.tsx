import type { Metadata } from "next";
import "./globals.css";
import "@/styles/theme.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Recipe Browser",
  description: "Browse and view delicious recipes with a modern Ocean Professional theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-[var(--ocean-bg)] text-[var(--ocean-text)] antialiased">
        <div className="relative">
          <div className="absolute inset-0 -z-10 ocean-gradient" aria-hidden="true" />
          <Header />
          <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
