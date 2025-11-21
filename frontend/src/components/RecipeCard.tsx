"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Recipe } from "@/types/recipe";
import { cn } from "@/lib/cn";

interface Props {
  recipe: Recipe;
}

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }: Props) {
  /** Card displaying recipe preview with favorite toggle. */
  const [favorite, setFavorite] = useState<boolean>(Boolean(recipe.favorite));

  return (
    <article className={cn("ocean-card overflow-hidden h-full flex flex-col")} aria-labelledby={`recipe-${recipe.id}-title`}>
      <Link href={`/recipe/${recipe.id}`} className="block focus-ring">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={recipe.image}
            alt={`${recipe.title} image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={false}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <header className="flex items-start justify-between gap-2">
          <h3 id={`recipe-${recipe.id}-title`} className="text-base font-semibold text-[var(--ocean-text)] leading-tight">
            <Link href={`/recipe/${recipe.id}`} className="hover:underline focus-ring">
              {recipe.title}
            </Link>
          </h3>
          <button
            aria-pressed={favorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setFavorite((v) => !v)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-ring",
              favorite ? "bg-[var(--ocean-secondary)] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
          >
            {favorite ? "★" : "☆"}
          </button>
        </header>
        <p className="text-sm text-gray-600 line-clamp-3">{recipe.description}</p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span>⏱ {recipe.cookingTime}m</span>
          <span>👤 {recipe.servings} servings</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2" aria-label="Tags">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-[rgba(37,99,235,0.1)] text-[var(--ocean-primary)] text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
