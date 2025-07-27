import React from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { useTranslation } from "react-i18next";

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, loadCryptos } = useCryptoStore();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    loadCryptos();
  };

  return (
    <div className="mb-4">
      <label htmlFor="currency-select" className="font-medium mr-2">
        {t("select_currency")}:
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={handleChange}
        className="border px-3 py-1 rounded"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="brl">BRL</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
