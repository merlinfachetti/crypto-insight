import React from "react";
import { useCryptoStore } from "../store/cryptoStore";
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
  const { priceHistory, selectedCoin } = useCryptoStore();

  if (!selectedCoin || priceHistory.length === 0) return null;

  return (
    <div className="mt-10 p-4 bg-white border rounded shadow">
      <h3 className="text-lg font-semibold mb-4">7-Day Price History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={priceHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
