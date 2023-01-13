import { createReactRouter, createRouteConfig } from "@tanstack/react-router";
import App from "./App";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: App,
});

const routeConfig = rootRoute.addChildren([indexRoute]);

export const router = createReactRouter({ routeConfig });
