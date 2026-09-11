"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { catalogue } from "@/data/products";
import type { CartLine, Money, ResolvedCartLine } from "@/lib/commerce/types";

/* ==========================================================================
   CART & WISHLIST
   --------------------------------------------------------------------------
   Client-side state today, persisted to localStorage. The reducer actions map
   one-to-one onto the mutations a commerce API exposes, so swapping this for a
   server cart is a matter of replacing the dispatch implementation.
   ========================================================================== */

const CART_KEY = "ak-brand:cart:v1";
const SAVED_KEY = "ak-brand:saved:v1";

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; variantId: string; quantity: number }
  | { type: "setQuantity"; lineId: string; quantity: number }
  | { type: "remove"; lineId: string }
  | { type: "clear" };

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = state.find((line) => line.variantId === action.variantId);
      if (existing) {
        return state.map((line) =>
          line.lineId === existing.lineId
            ? { ...line, quantity: Math.min(line.quantity + action.quantity, 99) }
            : line,
        );
      }
      return [
        ...state,
        {
          lineId: `${action.variantId}-${Date.now().toString(36)}`,
          productId: action.productId,
          variantId: action.variantId,
          quantity: action.quantity,
        },
      ];
    }
    case "setQuantity":
      return state
        .map((line) =>
          line.lineId === action.lineId
            ? { ...line, quantity: Math.max(0, Math.min(action.quantity, 99)) }
            : line,
        )
        .filter((line) => line.quantity > 0);
    case "remove":
      return state.filter((line) => line.lineId !== action.lineId);
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  count: number;
  subtotal: Money;
  isOpen: boolean;
  ready: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, variantId: string, quantity?: number) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  remove: (lineId: string) => void;
  clear: () => void;
  saved: string[];
  isSaved: (productId: string) => boolean;
  toggleSaved: (productId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [saved, setSaved] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", lines: readStorage<CartLine[]>(CART_KEY, []) });
    setSaved(readStorage<string[]>(SAVED_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* Storage can be unavailable (private mode, blocked cookies). */
    }
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {
      /* ignored */
    }
  }, [saved, ready]);

  // The drawer traps the page scroll while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const resolved = useMemo<ResolvedCartLine[]>(() => {
    return lines.flatMap((line) => {
      const product = catalogue.byId(line.productId);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      const colour = product?.colours.find((c) => c.id === variant?.colourId);
      if (!product || !variant || !colour) return [];
      return [
        {
          ...line,
          product,
          variant,
          colour,
          lineTotal: {
            amount: variant.price.amount * line.quantity,
            currency: variant.price.currency,
          },
        },
      ];
    });
  }, [lines]);

  const subtotal = useMemo<Money>(
    () => ({
      amount: resolved.reduce((sum, line) => sum + line.lineTotal.amount, 0),
      currency: resolved[0]?.lineTotal.currency ?? "EGP",
    }),
    [resolved],
  );

  const toggleSaved = useCallback((productId: string) => {
    setSaved((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: resolved,
      count: resolved.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      isOpen,
      ready,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (productId, variantId, quantity = 1) => {
        dispatch({ type: "add", productId, variantId, quantity });
        setIsOpen(true);
      },
      setQuantity: (lineId, quantity) => dispatch({ type: "setQuantity", lineId, quantity }),
      remove: (lineId) => dispatch({ type: "remove", lineId }),
      clear: () => dispatch({ type: "clear" }),
      saved,
      isSaved: (productId) => saved.includes(productId),
      toggleSaved,
    }),
    [resolved, subtotal, isOpen, ready, saved, toggleSaved],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
