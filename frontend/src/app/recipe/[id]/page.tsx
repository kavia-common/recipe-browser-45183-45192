'use client';

import { recipes } from "../../../lib/mockData";
import Image from "next/image";
import { useCart, CartQuality } from "../../../context/CartContext";
import React from "react";
import type { Recipe } from "../../../types/recipe";

/**
 * Dynamic route page for RecipeDetail.
 * @param params - dynamic route params from Next.js
 */
export default function RecipeDetailPage({ params }) {
  const recipe = recipes.find((r) => r.id === parseInt(params.id, 10));
  return (
    <RecipeDetail recipe={recipe} />
  );
}

// PUBLIC_INTERFACE
// Use 'use client' only inside RecipeDetail, so React hooks work and page-level doesn't break typing
// This prevents type errors for the page handler in Next.js.
function RecipeDetail({ recipe }: { recipe?: Recipe }) {
  const { cart, addItem, updateItem } = useCart();
  const inCart = recipe && cart.find((ci) => ci.id === recipe.id);
  const qualities: CartQuality[] = ["Fresh", "Good", "Premium"];

  if (!recipe) return <div className="p-8">Recipe not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 h-72 rounded-lg overflow-hidden">
          <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-blue-700 mb-3">{recipe.title}</h2>
          <span className="text-amber-500 font-medium text-lg mb-3">{recipe.tags?.join(", ")}</span>
          <p className="text-gray-700 mb-4">{recipe.description}</p>
          <span className="font-semibold text-blue-700 text-lg mb-4">${(recipe.price ?? 0).toFixed(2)}</span>
          {!inCart ? (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium shadow transition mt-2"
              onClick={() =>
                addItem({ id: recipe.id, title: recipe.title, price: recipe.price ?? 0 })
              }
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex flex-col gap-2 mt-2 w-full max-w-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateItem(recipe.id, { quantity: inCart.quantity - 1 })}
                  disabled={inCart.quantity <= 1}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-2 rounded transition disabled:opacity-60"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2">{inCart.quantity}</span>
                <button
                  onClick={() => updateItem(recipe.id, { quantity: inCart.quantity + 1 })}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-2 rounded transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <select
                  value={inCart.quality}
                  onChange={e =>
                    updateItem(recipe.id, { quality: e.target.value as CartQuality })
                  }
                  className="ml-2 border rounded px-2 py-1 text-sm"
                >
                  {qualities.map((q) => (
                    <option value={q} key={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xs text-blue-600 self-end">
                Subtotal: ${(inCart.quantity * inCart.price).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
