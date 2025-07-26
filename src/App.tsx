// src/App.tsx
import React from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { ConsentBanner } from "./components/ConsentBanner";
import "./i18n";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative">
      <Layout>
        <Home />
      </Layout>
      <ConsentBanner />
    </div>
  );
};

export default App;
