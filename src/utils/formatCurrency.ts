// src/utils/formatCurrency.ts
//
// Central currency formatter for CryptoInsight.
// Uses the Intl.NumberFormat API — correct locale, symbol and decimal places
// for every supported currency. Never hardcode "$".

const CURRENCY_LOCALES: Record<string, string> = {
  usd: "en-US",
  eur: "de-DE",
  brl: "pt-BR",
};

/**
 * Formats a price value with the correct currency symbol and locale.
 * @example formatPrice(70402, "usd") → "$70,402.00"
 * @example formatPrice(65000, "eur") → "65.000,00 €"
 * @example formatPrice(350000, "brl") → "R$\u00a0350.000,00"
 */
export function formatPrice(value: number, currency: string): string {
  const locale = CURRENCY_LOCALES[currency.toLowerCase()] ?? "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value);
}

/**
 * Compact formatter for chart axes (e.g. "$70.4k", "€1.2k", "R$350k").
 * Falls back to full format for values below 1000.
 */
export function formatPriceCompact(value: number, currency: string): string {
  if (value >= 1_000_000) {
    return formatPrice(value / 1_000_000, currency).replace(/[.,]\d+/, "") + "M";
  }
  if (value >= 1_000) {
    const compact = (value / 1000).toFixed(1);
    // Get just the symbol by formatting 0 and stripping the number
    const symbol = new Intl.NumberFormat(
      CURRENCY_LOCALES[currency.toLowerCase()] ?? "en-US",
      { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }
    ).format(0).replace(/[\d\s.,]/g, "").trim();
    return `${symbol}${compact}k`;
  }
  return formatPrice(value, currency);
}
