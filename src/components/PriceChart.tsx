// src/components/PriceChart.tsx
import React from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { useThemeStore } from "../store/themeStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PriceChart: React.FC = () => {
  const { priceHistory, selectedCoin, cryptos } = useCryptoStore();
  const { theme } = useThemeStore();

  if (!selectedCoin || priceHistory.length === 0) return null;

  const isDark = theme === "dark";

  const selectedCoinName = cryptos.find((c) => c.id === selectedCoin)?.name ?? selectedCoin;

  // Theme-aware colors
  const gridColor    = isDark ? "#374151" : "#e5e7eb"; // gray-700 : gray-200
  const axisColor    = isDark ? "#9ca3af" : "#6b7280"; // gray-400 : gray-500
  const tooltipBg    = isDark ? "#1f2937" : "#ffffff"; // gray-800 : white
  const tooltipBorder= isDark ? "#374151" : "#e5e7eb";
  const tooltipText  = isDark ? "#f9fafb" : "#111827";
  const lineColor    = "#3b82f6"; // blue-500 — works on both themes

  return (
    <div className="mt-10 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          7-Day Price History
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {selectedCoinName}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceHistory} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            tick={{ fill: axisColor, fontSize: 12 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fill: axisColor, fontSize: 12 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
            tickFormatter={(v: number) =>
              v >= 1000
                ? `$${(v / 1000).toFixed(1)}k`
                : `$${v.toFixed(2)}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
              color: tooltipText,
              fontSize: "13px",
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              "Price",
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
