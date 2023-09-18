import { Helmet } from "react-helmet";
import { Route } from "react-router-dom";

import { LazyRouteProps } from "./routes";
import { NoAccess } from "pages/denied-pages/no-access";

export const RoutesGenerator = (
  routes: LazyRouteProps[],
  access: (checkPermission: string) => boolean
) => {
  return routes.map((route) => {
    return route.children ? (
      <Route
        key={route.route}
        path={route.route}
        element={
          access(route.permission) ? (
            <>
              {route.title.length > 0 && (
                <Helmet key={route.title} title={route.title} />
              )}
              <route.component />
            </>
          ) : (
            <NoAccess />
          )
        }
      >
        {route.children.map((subRoute) => {
          return (
            <Route
              key={subRoute.route}
              path={subRoute.route}
              element={
                access(route.permission) ? (
                  <>
                    {route.title.length > 0 && (
                      <Helmet key={route.title} title={route.title} />
                    )}
                    <subRoute.component />
                  </>
                ) : (
                  <NoAccess />
                )
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
          access(route.permission) ? (
            <>
              {route.title.length > 0 && (
                <Helmet key={route.title} title={route.title} />
              )}
              <route.component />
            </>
          ) : (
            <NoAccess />
          )
        }
      />
    );
  });
};
