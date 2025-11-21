"use client";

import type { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: Recipe[];
}

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes }: Props) {
  /** Responsive grid of recipe cards. */
  if (!recipes.length) {
    return (
      <p role="status" className="text-gray-600">
        No recipes found. Try adjusting your search or filters.
      </p>
    );
  }
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      aria-label="Recipe results"
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </section>
  );
}
