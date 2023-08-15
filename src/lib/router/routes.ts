import { ComponentType } from "react";
import lazy, { PreloadableComponent } from "react-lazy-with-preload";

export type LazyRouteProps = {
  title: string;
  route: string;
  component: PreloadableComponent<ComponentType<any>>;
};

export type Route = LazyRouteProps;
export const unAuth: Array<Route> = [
  {
    title: "Main",
    route: "/",
    component: lazy(() => import("../../pages/main")),
  },
];

export const auth: Array<Route> = [];
export const routes = [...auth, ...unAuth];
