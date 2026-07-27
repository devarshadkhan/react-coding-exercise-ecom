export function makeQuantityKey(
  productId: string,
  variantId?: string,
): string {
  return `${productId}::${variantId || "default"}`;
}

export function parseQuantityKey(key: string): {
  productId: string;
  variantId: string;
} {
  const [productId, variantId = "default"] = key.split("::");
  return { productId, variantId };
}
