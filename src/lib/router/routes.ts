import { ComponentType } from "react";
import lazy, { PreloadableComponent } from "react-lazy-with-preload";

export type LazyRouteProps = {
  title: string;
  route: string;
  component: PreloadableComponent<ComponentType<any>>;
  permissions?: Array<string>;
  children?: Array<{
    title: string;
    route: string;
    component: PreloadableComponent<ComponentType<any>>;
    permissions?: Array<string>;
  }>;
};

export type Route = LazyRouteProps;
export const unAuth: Array<Route> = [
  {
    title: "Login",
    route: "/login",
    component: lazy(() => import("../../pages/auth/login")),
  },
  {
    title: "Registration",
    route: "/registration",
    component: lazy(() => import("../../pages/auth/registration")),
  },
];

export const auth: Array<Route> = [
  {
    title: "Main",
    route: "/admin",
    component: lazy(() => import("../../pages/admin")),
    children: [
      {
        title: "Home",
        route: "home",
        component: lazy(() => import("../../pages/admin/home")),
      },
    ],
  },
];
export const mutual: Array<Route> = [
  {
    title: "Main",
    route: "/",
    component: lazy(() => import("../../pages/main")),
    children: [
      {
        title: "Home",
        route: "/",
        component: lazy(() => import("../../pages/main/home")),
      },
      {
        title: "Watch",
        route: "watch/:id",
        component: lazy(() => import("../../pages/main/full-movie")),
      },
    ],
  },
];
export const routes = [...auth, ...unAuth, ...mutual];
