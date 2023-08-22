import { Helmet } from "react-helmet";
import { Route } from "react-router-dom";

import { LazyRouteProps } from "./routes";

export const RoutesGenerator = (routes: LazyRouteProps[]) => {
  return routes.map((route) => {
    return route.children ? (
      <Route
        key={route.route}
        path={route.route}
        element={
          <>
            <Helmet key={route.title} title={route.title} />
            <route.component />
          </>
        }
      >
        {route.children.map((subRoute) => {
          return (
            <Route
              key={subRoute.route}
              path={subRoute.route}
              element={
                <>
                  <Helmet key={subRoute.title} title={subRoute.title} />
                  <subRoute.component />
                </>
              }
            />
          );
        })}
      </Route>
    ) : (
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
