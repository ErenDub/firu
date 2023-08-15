import { Helmet } from "react-helmet";
import { Route } from "react-router-dom";

import { LazyRouteProps } from "./routes";

export const RoutesGenerator = (routes: LazyRouteProps[]) => {
  return routes.map((route) => {
    return (
      <Route
        key={route.route}
        path={route.route}
        element={
          <>
            <Helmet key={route.title} title={route.title} />
            <route.component />
          </>
        }
      />
    );
  });
};
