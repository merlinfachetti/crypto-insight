// src/pages/Landing.tsx
import React from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white text-sm">{question}</span>
        <span className="text-gray-400 ml-4 shrink-0 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

const Landing: React.FC = () => {
  const { t } = useTranslation();

  const concepts = [
    { icon: "⛓️", titleKey: "landing.concepts.blockchain_title", descKey: "landing.concepts.blockchain_desc" },
    { icon: "💎", titleKey: "landing.concepts.bitcoin_title",    descKey: "landing.concepts.bitcoin_desc" },
    { icon: "🔷", titleKey: "landing.concepts.ethereum_title",   descKey: "landing.concepts.ethereum_desc" },
    { icon: "🔑", titleKey: "landing.concepts.wallet_title",     descKey: "landing.concepts.wallet_desc" },
    { icon: "📊", titleKey: "landing.concepts.marketcap_title",  descKey: "landing.concepts.marketcap_desc" },
    { icon: "💧", titleKey: "landing.concepts.liquidity_title",  descKey: "landing.concepts.liquidity_desc" },
    { icon: "⛏️", titleKey: "landing.concepts.mining_title",     descKey: "landing.concepts.mining_desc" },
    { icon: "🏦", titleKey: "landing.concepts.decentralization_title", descKey: "landing.concepts.decentralization_desc" },
  ];

  const marketTerms = [
    { labelKey: "landing.market_data_terms.price_label",  defKey: "landing.market_data_terms.price_def" },
    { labelKey: "landing.market_data_terms.change_label", defKey: "landing.market_data_terms.change_def" },
    { labelKey: "landing.market_data_terms.mcap_label",   defKey: "landing.market_data_terms.mcap_def" },
    { labelKey: "landing.market_data_terms.volume_label", defKey: "landing.market_data_terms.volume_def" },
    { labelKey: "landing.market_data_terms.chart_label",  defKey: "landing.market_data_terms.chart_def" },
    { labelKey: "landing.market_data_terms.ath_label",    defKey: "landing.market_data_terms.ath_def" },
  ];

  const faqs = [
    { qKey: "landing.faq.q1", aKey: "landing.faq.a1" },
    { qKey: "landing.faq.q2", aKey: "landing.faq.a2" },
    { qKey: "landing.faq.q3", aKey: "landing.faq.a3" },
    { qKey: "landing.faq.q4", aKey: "landing.faq.a4" },
    { qKey: "landing.faq.q5", aKey: "landing.faq.a5" },
    { qKey: "landing.faq.q6", aKey: "landing.faq.a6" },
  ];

  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <section className="text-center py-16 px-4">
        <span className="inline-block text-5xl mb-6">₿</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {t("landing.hero_title")}{" "}
          <span className="text-blue-500">{t("landing.hero_highlight")}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("landing.hero_description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-md">
            {t("landing.open_dashboard")}
          </Link>
          <a href="#learn"
            className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
            {t("landing.learn_basics")}
          </a>
        </div>
      </section>

      {/* What is crypto */}
      <section id="learn" className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("landing.what_is_title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {t("landing.what_is_p1")}
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {t("landing.what_is_p2")}
        </p>
      </section>

      {/* Core concepts */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("landing.concepts_title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          {t("landing.concepts_subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {concepts.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl mb-3 block">{icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t(titleKey)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to read market data */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("landing.market_data_title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {t("landing.market_data_intro")}
        </p>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {marketTerms.map(({ labelKey, defKey }, i) => (
            <div key={labelKey}
              className={`flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-4 ${
                i !== marketTerms.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}>
              <span className="shrink-0 w-32 text-sm font-semibold text-blue-500">{t(labelKey)}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{t(defKey)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
            {t("landing.disclaimer_title")}
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-500 leading-relaxed">
            {t("landing.disclaimer_text")}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t("landing.faq_title")}
        </h2>
        <div className="space-y-3">
          {faqs.map(({ qKey, aKey }) => (
            <FaqItem key={qKey} question={t(qKey)} answer={t(aKey)} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t("landing.cta_title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          {t("landing.cta_subtitle")}
        </p>
        <Link to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-md">
          {t("landing.open_dashboard")}
        </Link>
      </section>

    </div>
  );
};

export default Landing;
