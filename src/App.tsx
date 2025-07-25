import React from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CookieConsent from "./components/CookieConsent";
import { ConsentBanner } from "./components/ConsentBanner";
import "./i18n";

const App: React.FC = () => {
  return (
    <>
      <ConsentBanner />
      <Layout>
        <Home />
      </Layout>
      <CookieConsent />
    </>
  );
};

export default App;
