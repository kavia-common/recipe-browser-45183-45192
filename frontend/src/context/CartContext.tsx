"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartQuality = "Fresh" | "Good" | "Premium";
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  quality: CartQuality;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "quality">) => void;
  updateItem: (id: number, data: Partial<Pick<CartItem, "quantity" | "quality">>) => void;
  removeItem: (id: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "recipe_cart";

function getInitialCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!json) return [];
    return JSON.parse(json);
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, "quantity" | "quality">) => {
    setCart((old) => {
      const exists = old.find((r) => r.id === item.id);
      if (exists) {
        // If exists, increment quantity
        return old.map((r) =>
          r.id === item.id ? { ...r, quantity: r.quantity + 1 } : r
        );
      }
      return [
        ...old,
        {
          ...item,
          quantity: 1,
          quality: "Fresh" as CartQuality,
        },
      ];
    });
  };

  const updateItem = (id: number, data: Partial<Pick<CartItem, "quantity" | "quality">>) => {
    setCart((cart) =>
      cart
        .map((item) => (item.id === id ? { ...item, ...data } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateItem, removeItem, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// PUBLIC_INTERFACE
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
