import { setGlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import { AuthContext } from "lib/providers/login-provider/context/authContext";
import { getRefreshToken } from "lib/providers/login-provider/token";
import { auth, unAuth, mutual } from "lib/router/routes";
import { RoutesGenerator } from "lib/router/routes-generator";
import { refresh } from "modules/login/api/loginFetch";
import { Tuser } from "modules/login/api/loginType";
import { NotFound } from "pages/denied-pages/not-found";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";

function App() {
  const [checkAuth, setCheckAuth] = useState<string | null>(getRefreshToken());
  const [userInfo, setUserInfo] = useState<Tuser | undefined>();
  const [permissions, setPermissions] = useState<Array<string>>();
  const refreshToken = getRefreshToken() ?? null;
  const refreshObject = { token: refreshToken };
  const $refresh = useMutation(refresh);
  useEffect(() => {
    checkAuth &&
      $refresh.mutate(refreshObject, {
        onSuccess: (data) => {
          const decodedToken: { permissions: Array<string> } = jwt_decode(
            data.tokens.accessToken
          );
          setPermissions(decodedToken.permissions);
          data.tokens.accessToken
            ? setGlobalAccessToken(data.tokens.accessToken)
            : setGlobalAccessToken(null);
          setUserInfo({
            ...data.user,
          });
        },
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const access = (checkPermission: string) => {
    if (checkPermission.length === 0) return true;
    else if (
      permissions &&
      permissions.find((permission) => permission === checkPermission)
    )
      return true;
    else return false;
  };

  const unAuthRoutes = !checkAuth ? RoutesGenerator(unAuth, access) : null;
  const authRoutes = checkAuth ? RoutesGenerator(auth, access) : null;
  const mutualRoutes = RoutesGenerator(mutual, access);

  return (
    <>
      <AuthContext.Provider
        value={{
          checkAuth,
          userInfo,
          permissions,
          setCheckAuth,
          setUserInfo,
          setPermissions,
          access,
        }}
      >
        {!$refresh.isLoading && (
          <Routes>
            {unAuthRoutes}
            {mutualRoutes}
            {authRoutes}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
