import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Recipe } from "@/types/recipe";
import { getMockRecipes, getMockRecipeById } from "@/lib/mockData";

// For static export, declare static generation behaviors
export const dynamic = "error";

// PUBLIC_INTERFACE
export function generateStaticParams(): Array<{ id: string }> {
  /** Provides the list of pre-rendered recipe IDs so output: "export" works. */
  return getMockRecipes().map((r) => ({ id: r.id }));
}

// PUBLIC_INTERFACE
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  /** Generates per-recipe metadata for better SEO and to satisfy typing. */
  const r = getMockRecipeById(params.id);
  return {
    title: r ? `${r.title} – Ocean Recipes` : "Recipe – Ocean Recipes",
    description: r?.description ?? "Recipe details",
  };
}

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  /**
   * Recipe detail page shows title, image, ingredients, steps, cooking time, servings, and tags.
   * For static export we use mock data during build. At runtime, pages are pre-generated.
   */
  const recipe: Recipe | null = getMockRecipeById(params.id) ?? null;

  if (!recipe) {
    return (
      <div className="ocean-card p-6">
        <p className="text-gray-700">Recipe not found.</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--ocean-primary)] px-4 py-2 text-white focus-ring"
        >
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <article className="ocean-surface overflow-hidden">
      <header className="relative">
        <div className="relative aspect-[16/6] bg-gray-100 overflow-hidden">
          <Image
            src={recipe.image}
            alt={`${recipe.title} hero image`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6 md:p-8">
          <nav className="mb-4" aria-label="Breadcrumb">
            <Link href="/" className="text-[var(--ocean-primary)] hover:underline focus-ring">
              ← Back to browse
            </Link>
          </nav>
          <h1 className="text-3xl font-semibold text-[var(--ocean-text)]">
            {recipe.title}
          </h1>
          <p className="mt-2 text-gray-600">{recipe.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              ⏱ <strong className="text-[var(--ocean-text)]">{recipe.cookingTime}m</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              👤 <strong className="text-[var(--ocean-text)]">{recipe.servings} servings</strong>
            </span>
            <div className="flex flex-wrap gap-1" aria-label="Tags">
              {recipe.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-[rgba(37,99,235,0.1)] text-[var(--ocean-primary)] text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--ocean-text)]">Steps</h2>
          <ol className="space-y-3 list-decimal pl-6">
            {recipe.steps.map((s, idx) => (
              <li key={idx} className="text-gray-700">
                {s}
              </li>
            ))}
          </ol>
        </div>
        <aside className="lg:col-span-1">
          <div className="ocean-card p-5">
            <h2 className="text-xl font-semibold text-[var(--ocean-text)]">Ingredients</h2>
            <ul className="mt-3 space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={`${ing.name}-${idx}`} className="flex items-center justify-between text-gray-700">
                  <span>{ing.name}</span>
                  <span className="text-gray-500">{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </article>
  );
}
