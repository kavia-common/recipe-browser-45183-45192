"use client";

import { cn } from "@/lib/cn";
import { useId } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder, className }: Props) {
  /** Accessible search input with subtle styling. */
  const id = useId();
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Search recipes
      </label>
      <div className="relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "Search recipes..."}
          className="w-full rounded-lg border border-black/10 bg-white/90 px-4 py-2 pr-10 shadow-sm focus:ring-4 focus:ring-[rgba(37,99,235,0.25)] focus:outline-none"
          aria-label="Search recipes"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ocean-primary)]"
        >
          ⌕
        </span>
      </div>
    </div>
  );
}
