export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatMonthly(value: number): string {
  return `${formatPrice(value)}/mo`;
}
