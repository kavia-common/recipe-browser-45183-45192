"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import RecipeGrid from "@/components/RecipeGrid";
import { fetchRecipes } from "@/lib/api";
import { getMockRecipes } from "@/lib/mockData";
import type { Recipe } from "../types/recipe";

export default function Home() {
  // Explicitly type recipes as Recipe[], always having tags: string[]
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [recipes, setRecipes] = useState<Recipe[]>(getMockRecipes().map(r => ({
    ...r,
    tags: r.tags ?? [],
  })));
  const [loading, setLoading] = useState(false);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    recipes.forEach((r) => (r.tags ?? []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [recipes]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchRecipes({ search, tag: category })
      .then((data) => {
        if (!active) return;
        // ensure all recipes have tags: string[]
        setRecipes(data.map((r: Recipe) => ({
          ...r,
          tags: r.tags ?? [],
        })));
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [search, category]);

  return (
    <div className="space-y-6">
      <section className="ocean-surface p-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <h1 className="text-2xl font-semibold text-[var(--ocean-text)]">Browse Recipes</h1>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-end w-full md:w-auto">
            <SearchBar value={search} onChange={setSearch} />
            <Filters tags={allTags} value={category} onChange={setCategory} />
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Discover delicious ideas styled with the Ocean Professional theme.
        </p>
      </section>

      <section aria-live="polite" className="min-h-[200px]">
        {loading ? (
          <div className="ocean-card p-6 text-gray-600">Loading recipes…</div>
        ) : (
          <RecipeGrid recipes={recipes} />
        )}
      </section>
    </div>
  );
}
