import { recipes } from "../../../lib/mockData";
import Image from "next/image";
import { useCart, CartQuality } from "../../../context/CartContext";
import Header from "../../../components/Header";

/**
 * Recipe detail page for /recipe/[id] in Next.js.
 * No "use client" at the top level to allow static export.
 */
// PUBLIC_INTERFACE
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const recipe = recipes.find((r) => r.id === parseInt(id, 10));
  return (
    <RecipeDetailClient recipe={recipe} />
  );
}

// PUBLIC_INTERFACE
function RecipeDetailClient({ recipe }: { recipe?: { id: number; title: string; description: string; image: string; price: number; tags?: string[] } }) {
  "use client";
  const { cart, addItem, updateItem } = useCart?.() || { cart: [], addItem: () => {}, updateItem: () => {} };
  const inCart = recipe && cart.find((ci) => ci.id === recipe.id);
  const qualities: CartQuality[] = ["Fresh", "Good", "Premium"];

  if (!recipe)
    return (
      <div className="p-8" style={{ color: 'var(--color-error)', background: 'var(--color-background)', minHeight: '100vh' }}>
        Recipe not found.
      </div>
    );

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-background)",
      color: "var(--color-text)",
      paddingBottom: "2rem"
    }}>
      <Header />
      <main
        className="max-w-3xl mx-auto p-8 surface rounded shadow mt-10"
        style={{
          background: "var(--color-surface)",
          color: "var(--color-text)",
          borderRadius: "0.75rem",
          boxShadow: "var(--color-shadow)",
          border: "1px solid var(--color-border)",
          marginTop: "2.5rem",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/2 h-72 rounded-lg overflow-hidden" style={{ background: "var(--color-background)" }}>
            <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--color-primary)" }}>{recipe.title}</h2>
            <span className="font-medium text-lg mb-3" style={{ color: "var(--color-secondary)" }}>{recipe.tags?.join(", ")}</span>
            <p className="mb-4" style={{ color: "var(--color-text)" }}>
              {recipe.description}
            </p>
            <span className="font-semibold text-lg mb-4" style={{ color: "var(--color-primary)" }}>
              ${(recipe.price ?? 0).toFixed(2)}
            </span>
            {!inCart ? (
              <button
                className="rounded px-4 py-2 font-medium shadow transition mt-2 focus-visible:outline-none"
                style={{
                  background: "var(--color-primary)",
                  color: "var(--color-background)",
                  boxShadow: "var(--color-shadow)",
                }}
                onClick={() => addItem({ id: recipe.id, title: recipe.title, price: recipe.price ?? 0 })}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateItem(recipe.id, { quantity: inCart.quantity - 1 })}
                    disabled={inCart.quantity <= 1}
                    className="font-bold px-2 rounded transition disabled:opacity-60 focus-visible:outline-none"
                    style={{
                      background: inCart.quantity <= 1 ? "var(--color-border)" : "var(--color-surface)",
                      color: "var(--color-primary)",
                    }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2">{inCart.quantity}</span>
                  <button
                    onClick={() => updateItem(recipe.id, { quantity: inCart.quantity + 1 })}
                    className="font-bold px-2 rounded transition focus-visible:outline-none"
                    style={{ background: "var(--color-surface)", color: "var(--color-primary)" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <select
                    value={inCart.quality}
                    onChange={e => updateItem(recipe.id, { quality: e.target.value as CartQuality })}
                    className="ml-2 border rounded px-2 py-1 text-sm"
                    style={{
                      background: "var(--color-background)",
                      color: "var(--color-text)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {qualities.map((q) => (
                      <option value={q} key={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-xs self-end" style={{ color: "var(--color-primary)" }}>
                  Subtotal: ${(inCart.quantity * inCart.price).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate all possible IDs for recipes for static export
export async function generateStaticParams() {
  return recipes.map(recipe => ({
    id: recipe.id.toString(),
  }));
}
