import { setGlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import { AuthContext } from "lib/providers/login-provider/context/authContext";
import { getRefreshToken } from "lib/providers/login-provider/token";
import { auth, unAuth, mutual } from "lib/router/routes";
import { RoutesGenerator } from "lib/router/routes-generator";
import { refresh } from "modules/login/api/loginFetch";
import { Tuser } from "modules/login/api/loginType";
import { NotFound } from "pages/main/denied-pages/not-found";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Route, Routes } from "react-router-dom";

function App() {
  const [checkAuth, setCheckAuth] = useState<string | null>(getRefreshToken());
  const [userInfo, setUserInfo] = useState<Tuser | undefined>();
  const refreshToken = getRefreshToken() ?? null;
  const refreshObject = { token: refreshToken };
  const $refresh = useMutation(refresh);
  useEffect(() => {
    $refresh.mutate(refreshObject, {
      onSuccess: (data) => {
        data.accessToken
          ? setGlobalAccessToken(data.accessToken)
          : setGlobalAccessToken(null);
        setUserInfo({
          ...data.user,
        });
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unAuthRoutes = !checkAuth ? RoutesGenerator(unAuth) : null;
  const authRoutes = checkAuth ? RoutesGenerator(auth) : null;
  const mutualRoutes = RoutesGenerator(mutual);

  return (
    <>
      <AuthContext.Provider
        value={{ checkAuth, userInfo, setCheckAuth, setUserInfo }}
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
