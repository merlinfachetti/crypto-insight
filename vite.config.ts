/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
// This configuration file sets up Vite for a React project with testing capabilities using Vitest.
// It includes the React plugin for Vite and configures the testing environment to use JSDOM.
// The 'globals' option allows the use of global variables in tests, making it easier to write tests without needing to import them explicitly.
// The 'environment' option specifies that the tests will run in a JSDOM environment, which simulates a browser-like environment for testing purposes.
// This setup is useful for projects that require both development and testing configurations, ensuring a smooth workflow for developers.
// The configuration is straightforward, focusing on essential features for React development and testing.
