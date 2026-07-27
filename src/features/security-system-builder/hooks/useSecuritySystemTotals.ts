"use client";

import { useMemo } from "react";
import type { Product } from "@/types";
import { useSecuritySystem } from "@/hooks/useSecuritySystem";
import { buildLineItems, computeTotals } from "@/lib/calculations";
import productsData from "@/data/products.json";

const products = productsData as Product[];

/** Derives cart totals (compare-at, active, savings, monthly) from the current quantities. */
export function useSecuritySystemTotals() {
  const { state } = useSecuritySystem();

  return useMemo(() => {
    const lineItems = buildLineItems(state.quantities, products);
    return computeTotals(lineItems);
  }, [state.quantities]);
}
