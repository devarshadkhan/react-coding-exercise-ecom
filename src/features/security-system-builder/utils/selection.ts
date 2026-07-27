export function countSelectedProducts(
  quantities: Record<string, number>,
  productIds: string[],
): number {
  return productIds.filter((productId) =>
    Object.entries(quantities).some(
      ([key, qty]) => key.startsWith(`${productId}::`) && qty > 0,
    ),
  ).length;
}
