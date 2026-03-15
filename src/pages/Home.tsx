// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CryptoList from "../components/CryptoList";
import CryptoFilter from "../components/CryptoFilter";
import CurrencySelector from "../components/CurrencySelector";
import PriceChart from "../components/PriceChart";
import { ConsentSettings } from "../components/ConsentSettings";
import { ApiFallback } from "@/components/ApiFallback";
import CoinDetailDrawer from "../components/CoinDetailDrawer";
import { useCryptoStore } from "@/store/cryptoStore";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading, error, cryptos, loadCryptos } = useCryptoStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => { loadCryptos(); }, [loadCryptos]);

  if (isLoading && cryptos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-900 dark:text-white">
        <div className="text-center">
          <p className="text-lg">{t("dashboard.loading")}</p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-white mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="py-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          {t("dashboard.title")}
        </h2>
        {error && <ApiFallback retryFn={loadCryptos} />}
        <CurrencySelector />
        <CryptoFilter />
        <CryptoList onOpenDetail={() => setDrawerOpen(true)} />
        <PriceChart />
        <ConsentSettings />
      </div>
      <CoinDetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  );
};

export default Home;
