export const CURRENCY = "$";

export function formatPrice(price) {
  return `${CURRENCY}${Number(price).toLocaleString()}`;
}