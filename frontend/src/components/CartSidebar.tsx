import React, { useState } from "react";
import { useCart, CartQuality } from "../context/CartContext";

const qualities: CartQuality[] = ["Fresh", "Good", "Premium"];

export default function CartSidebar() {
  const { cart, updateItem, removeItem, total, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open cart"
        title="View cart"
        className="relative rounded-full bg-white p-2 border border-blue-500 hover:bg-blue-50 transition focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 1.293a1 1 0 001.415 1.414L7 13zm0 0a1 1 0 001 1h6a1 1 0 001-1v-1H7v1z" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-xs text-black px-1.5 rounded-full shadow font-semibold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Sidebar */}
      {open && (
        <aside className="fixed top-0 right-0 w-80 max-w-[95vw] h-full shadow-2xl bg-white z-50 border-l border-blue-100 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-blue-100">
            <h2 className="text-lg font-semibold text-blue-600">Cart</h2>
            <button
              aria-label="Close cart"
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-blue-600 rounded p-2 transition"
            >
              &#x2715;
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
              <span>Your cart is empty.</span>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-blue-50">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center px-4 py-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="flex items-center mt-1">
                        <span className="mr-2">Quality:</span>
                        <select
                          value={item.quality}
                          onChange={(e) =>
                            updateItem(item.id, { quality: e.target.value as CartQuality })
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {qualities.map((q) => (
                            <option value={q} key={q}>
                              {q}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <div className="flex items-center mb-1">
                        <button
                          onClick={() =>
                            updateItem(item.id, { quantity: item.quantity - 1 })
                          }
                          className="bg-blue-100 hover:bg-blue-200 px-2 rounded-l"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItem(item.id, { quantity: item.quantity + 1 })
                          }
                          className="bg-blue-100 hover:bg-blue-200 px-2 rounded-r"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 mt-1 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Cart Footer */}
          <div className="p-4 border-t border-blue-100 bg-gradient-to-b from-blue-500/10 to-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="text-xl font-semibold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white rounded px-3 py-2 transition font-medium"
              >
                Clear Cart
              </button>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
