export function formatCurrency(
  amount: number,
  currency: string = "COP"
): string {
  return amount.toLocaleString("es-CO", {
    style: "currency",
    currency: currency,
  });
}
