import Image from "next/image";
import Link from "next/link";
import { Recipe } from "../types/recipe";
import { useCart, CartQuality } from "../context/CartContext";
import React from "react";

interface RecipeCardProps {
  recipe: Recipe;
}

const qualities: CartQuality[] = ["Fresh", "Good", "Premium"];

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { cart, addItem, updateItem } = useCart();
  const inCart = cart.find((ci) => ci.id === recipe.id);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col overflow-hidden hover:shadow-lg transition">
      <Link href={`/recipe/${recipe.id}`}>
        <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden">
          <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" className="rounded-t-lg" />
        </div>
        <h3 className="font-semibold text-lg text-gray-900">{recipe.title}</h3>
        <div className="text-gray-500 text-sm mb-2">{recipe.tags?.join(", ")}</div>
      </Link>
      <p className="flex-1 text-gray-700 mb-4">{recipe.description}</p>
      
      <div className="mt-2 flex flex-col items-stretch">
        <span className="text-blue-700 font-bold mb-2">${(recipe.price ?? 0).toFixed(2)}</span>
        {!inCart ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-1 font-medium shadow transition"
            onClick={() =>
              addItem({ id: recipe.id, title: recipe.title, price: recipe.price ?? 0 })
            }
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex flex-col items-stretch">
            <div className="flex items-center gap-2 justify-between">
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
            <span className="text-xs text-blue-600 mt-1 self-end">
              Subtotal: ${(inCart.quantity * inCart.price).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
