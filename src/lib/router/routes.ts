import { ComponentType } from "react";
import lazy, { PreloadableComponent } from "react-lazy-with-preload";

export type LazyRouteProps = {
  title: string;
  route: string;
  component: PreloadableComponent<ComponentType<any>>;
  permission: string;
  children?: Array<{
    title: string;
    route: string;
    component: PreloadableComponent<ComponentType<any>>;
    permission: string;
  }>;
};

export type Route = LazyRouteProps;
export const unAuth: Array<Route> = [
  {
    title: "შესვლა",
    route: "/login",
    component: lazy(() => import("../../pages/auth/login")),
    permission: "",
  },
  {
    title: "რეგისტრაცია",
    route: "/registration",
    component: lazy(() => import("../../pages/auth/registration")),
    permission: "",
  },
];

export const auth: Array<Route> = [
  {
    title: "მთავარი",
    route: "/admin",
    component: lazy(() => import("../../pages/admin")),
    permission: "open_admin_page",
    children: [
      {
        title: "ფილმები",
        route: "movies",
        component: lazy(() => import("../../pages/admin/movies")),
        permission: "",
      },
      {
        title: "ფილმის დამატება",
        route: "add-movie",
        component: lazy(() => import("../../pages/admin/movies/add-movie")),
        permission: "add_new_movie",
      },
      {
        title: "ფილმის რედაქტირება",
        route: "edit-movie/:movieId",
        component: lazy(() => import("../../pages/admin/movies/edit-movie")),
        permission: "edit_movie",
      },
    ],
  },
];
export const mutual: Array<Route> = [
  {
    title: "მთავარი",
    route: "/",
    component: lazy(() => import("../../pages/main")),
    permission: "",

    children: [
      {
        title: "მთავარი",
        route: "/",
        component: lazy(() => import("../../pages/main/home")),
        permission: "",
      },
      {
        title: "",
        route: "watch/:movieId",
        component: lazy(() => import("../../pages/main/full-movie")),
        permission: "",
      },
      {
        title: "ძებნა",
        route: "search",
        component: lazy(() => import("../../pages/main/search")),
        permission: "",
      },
      {
        title: "ფილმები",
        route: "movies",
        component: lazy(() => import("../../pages/main/filters/movies")),
        permission: "",
      },
    ],
  },
];
export const routes = [...auth, ...unAuth, ...mutual];
