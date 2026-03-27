import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensures purely numeric tickers are treated as Taiwan market tickers.
 * e.g., '0050' -> '0050.TW'
 */
export function formatTickerForApi(ticker: string): string {
  const trimmed = ticker.trim().toUpperCase();
  if (/^\d+$/.test(trimmed)) {
    return `${trimmed}.TW`;
  }
  return trimmed;
}
