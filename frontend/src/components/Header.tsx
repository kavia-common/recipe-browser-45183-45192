"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

// PUBLIC_INTERFACE
export default function Header() {
  /** Renders the global header with navigation following the Ocean Professional style. */
  const pathname = usePathname();
  const nav = [
    { href: "/", label: "Browse" },
    // In future we can add: { href: "/favorites", label: "Favorites" },
  ];
  return (
    <header className="backdrop-blur bg-white/70 border-b border-black/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus-ring">
          <div
            aria-hidden
            className="h-8 w-8 rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,1), rgba(245,158,11,1))",
            }}
          />
          <span className="text-lg font-semibold tracking-tight text-[var(--ocean-text)]">
            Ocean Recipes
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm transition-colors focus-ring",
                      active
                        ? "bg-[var(--ocean-primary)] text-white"
                        : "text-[var(--ocean-text)] hover:bg-[rgba(37,99,235,0.08)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
