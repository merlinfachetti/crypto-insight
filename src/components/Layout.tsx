import React from "react";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow px-4 py-6 w-full max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
