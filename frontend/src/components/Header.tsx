"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
const CartSidebar = dynamic(() => import("./CartSidebar"), { ssr: false });

export default function Header() {
  return (
    <header className="bg-white shadow-lg px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Image src="/favicon.ico" alt="Logo" width={36} height={36} />
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
          Ocean<span className="text-amber-400">Recipes</span>
        </h1>
      </div>
      <nav className="flex items-center">
        {/* Cart is always visible on the right */}
        <CartSidebar />
      </nav>
    </header>
  );
}
