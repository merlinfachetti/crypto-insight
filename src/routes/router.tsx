import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "../components/Layout";
import { ConsentBanner } from "../components/ConsentBanner";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import About from "../pages/About";
import Favorites from "../pages/Favorites";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <ConsentBanner />
    </Layout>
  ),
});

// Landing page — educational entry point
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

// Dashboard — live market data
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Home,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favorites",
  component: Favorites,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  dashboardRoute,
  favoritesRoute,
  aboutRoute,
]);

export const router = createRouter({ routeTree });
