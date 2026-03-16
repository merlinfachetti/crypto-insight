// src/components/CoinDetailDrawer.tsx
//
// Slide-in drawer that shows educational details about a selected coin.
// Layer 1: data already in the store (instant — no extra fetch).
// Layer 2: description, website, social links, category, genesis date
//          fetched on-demand from /coins/{id} with loading skeleton.

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useCryptoStore } from "../store/cryptoStore";
import { fetchCoinDetail } from "../services/coingecko";
import { formatPrice } from "../utils/formatCurrency";
import type { CoinDetail } from "../../shared/types";

// Strips HTML tags from CoinGecko description (returns plain text)
function stripHtml(html: string): string {
  return html
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, "$2 ($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function formatLargeNumber(n: number, currency: string): string {
  if (n >= 1_000_000_000)
    return formatPrice(n / 1_000_000_000, currency).replace(/[.,]\d+/, "") + "B";
  if (n >= 1_000_000)
    return formatPrice(n / 1_000_000, currency).replace(/[.,]\d+/, "") + "M";
  return formatPrice(n, currency);
}

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-900 dark:text-white text-right">{value}</span>
    </div>
  );
}

function SkeletonLine({ w = "100%" }: { w?: string }) {
  return (
    <div
      className="h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
      style={{ width: w }}
    />
  );
}

interface CoinDetailDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CoinDetailDrawer: React.FC<CoinDetailDrawerProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { selectedCoin, cryptos, currency } = useCryptoStore();
  const coin = cryptos.find((c) => c.id === selectedCoin) ?? null;

  const [detail, setDetail] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    if (!selectedCoin) return;
    setLoading(true);
    setError(null);
    setDetail(null);
    try {
      const data = await fetchCoinDetail(selectedCoin);
      setDetail(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load details");
    } finally {
      setLoading(false);
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (open && selectedCoin) loadDetail();
  }, [open, selectedCoin, loadDetail]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!coin) return null;

  const change = coin.price_change_percentage_24h ?? 0;
  const isPositive = change >= 0;

  const descriptionText = detail
    ? stripHtml(detail.description?.en ?? "").slice(0, 800)
    : null;

  const website = detail?.links?.homepage?.[0]?.replace(/\/$/, "") ?? null;
  const twitter = detail?.links?.twitter_screen_name
    ? `https://twitter.com/${detail.links.twitter_screen_name}`
    : null;
  const reddit = detail?.links?.subreddit_url ?? null;
  const github = detail?.links?.repos_url?.github?.[0] ?? null;
  const genesisDate = detail?.genesis_date
    ? new Date(detail.genesis_date).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;
  const categories = detail?.categories?.filter(Boolean).slice(0, 3) ?? [];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${coin.name} details`}
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white dark:bg-gray-900 shadow-2xl
          flex flex-col transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3">
            <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full" />
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white leading-tight">{coin.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Price hero */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(coin.current_price, currency)}
            </p>
            <span
              className={`inline-flex items-center gap-1 mt-1 text-sm font-medium px-2 py-0.5 rounded ${
                isPositive
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(2)}% (24h)
            </span>
          </div>

          {/* Market stats — Layer 1: instant from store */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {t("drawer.market_data")}
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-1">
              <StatRow label={t("drawer.market_cap")} value={formatLargeNumber(coin.market_cap, currency)} />
              <StatRow label={t("drawer.rank")} value={`#${coin.market_cap_rank}`} />
              <StatRow label={t("drawer.volume")} value={formatLargeNumber(coin.total_volume, currency)} />
              <StatRow label={t("drawer.ath")} value={formatPrice(coin.ath, currency)} />
              <StatRow label={t("drawer.atl")} value={formatPrice(coin.atl, currency)} />
              <StatRow
                label={t("drawer.circulating")}
                value={`${(coin.circulating_supply ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })} ${coin.symbol.toUpperCase()}`}
              />
              {coin.max_supply && (
                <StatRow
                  label={t("drawer.max_supply")}
                  value={`${coin.max_supply.toLocaleString("en-US", { maximumFractionDigits: 0 })} ${coin.symbol.toUpperCase()}`}
                />
              )}
            </div>
          </section>

          {/* About — Layer 2: fetched on demand */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {t("drawer.about")}
            </h3>

            {loading && (
              <div className="space-y-2">
                <SkeletonLine />
                <SkeletonLine w="90%" />
                <SkeletonLine w="80%" />
                <SkeletonLine w="95%" />
                <SkeletonLine w="70%" />
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-xs text-yellow-700 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2">
                <span>⚠️</span>
                <span>{t("drawer.error")}</span>
                <button
                  onClick={loadDetail}
                  className="ml-auto text-yellow-600 dark:text-yellow-400 font-medium hover:underline"
                >
                  {t("api_error.retry_now")}
                </button>
              </div>
            )}

            {detail && (
              <div className="space-y-4">
                {/* Description */}
                {descriptionText && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {descriptionText}
                    {(detail.description?.en ?? "").length > 800 && "…"}
                  </p>
                )}

                {/* Categories + Genesis */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-1">
                  {categories.length > 0 && (
                    <StatRow
                      label={t("drawer.category")}
                      value={
                        <div className="flex flex-wrap gap-1 justify-end">
                          {categories.map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      }
                    />
                  )}
                  {genesisDate && (
                    <StatRow label={t("drawer.launched")} value={genesisDate} />
                  )}
                </div>

                {/* Links */}
                {(website || twitter || reddit || github) && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {t("drawer.links")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
                          🌐 {t("drawer.website")}
                        </a>
                      )}
                      {twitter && (
                        <a href={twitter} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
                          𝕏 Twitter
                        </a>
                      )}
                      {reddit && (
                        <a href={reddit} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
                          🟠 Reddit
                        </a>
                      )}
                      {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
                          ⌥ GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Data attribution */}
          <p className="text-xs text-gray-400 dark:text-gray-600 pb-2">
            {t("drawer.attribution", {
              provider: (
                <a key="cg" href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer"
                  className="underline hover:text-gray-600 dark:hover:text-gray-400">
                  CoinGecko
                </a>
              ) as unknown as string,
            })}
          </p>
        </div>
      </aside>
    </>
  );
};

export default CoinDetailDrawer;
