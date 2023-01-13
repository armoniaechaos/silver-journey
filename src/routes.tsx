import { createReactRouter, createRouteConfig } from "@tanstack/react-router";
import App from "./components/App";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: App,
});

// This route is the same as the indexRoute, but with the UsersModal open
const usersRoute = rootRoute.createRoute({
  path: "/users",
  component: () => <App isUsersModalOpen />,
});

const routeConfig = rootRoute.addChildren([indexRoute, usersRoute]);

export const router = createReactRouter({ routeConfig });
