import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "../components/Layout";
import { ConsentBanner } from "../components/ConsentBanner";
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

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favorites",
  component: Favorites,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  favoritesRoute,
  aboutRoute,
]);

export const router = createRouter({ routeTree });
