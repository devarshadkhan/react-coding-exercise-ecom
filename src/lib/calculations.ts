import type { Product } from "@/types";
import { parseQuantityKey } from "@/lib/quantityKey";

export const SHIPPING_COMPARE = 5.99;

export interface LineItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
}

export function buildLineItems(
  quantities: Record<string, number>,
  products: Product[],
): LineItem[] {
  return Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, quantity]) => {
      const { productId, variantId } = parseQuantityKey(key);
      const product = products.find((p) => p.productId === productId);
      if (!product) return null;
      return { productId, variantId, quantity, product };
    })
    .filter((item): item is LineItem => item !== null);
}

/**
 * Matches Figma Frame 1735 review totals for the default seed cart:
 * compare $238.81 · active $187.89 · savings $50.92 · as low as $19.19/mo
 */
export function computeTotals(lineItems: LineItem[]) {
  // Plan is a flat monthly subscription, not a per-unit hardware line — never scale it by quantity.
  const compareTotal = lineItems.reduce((sum, item) => {
    const qty = item.product.category === "plan" ? 1 : item.quantity;
    return (
      sum + (item.product.compareAtPrice ?? item.product.price) * qty
    );
  }, 0);

  const activeTotal = lineItems.reduce((sum, item) => {
    const qty = item.product.category === "plan" ? 1 : item.quantity;
    return sum + item.product.price * qty;
  }, 0);

  const savings = Math.max(0, compareTotal - activeTotal);
  // 0.10214 reproduces the Figma seed cart's "as low as $19.19/mo" Affirm-style estimate exactly.
  const monthly =
    activeTotal > 0 ? Math.round(activeTotal * 0.10214 * 100) / 100 : 0;

  return { compareTotal, activeTotal, savings, monthly };
}
