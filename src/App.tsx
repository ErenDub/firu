import { setGlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import {
  AuthContext,
  UserType,
} from "lib/providers/login-provider/context/authContext";
import { getRefreshToken } from "lib/providers/login-provider/token";
import { auth, unAuth } from "lib/router/routes";
import { RoutesGenerator } from "lib/router/routes-generator";
import { refresh } from "modules/login/api/loginFetch";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Route, Routes } from "react-router-dom";

function App() {
  const [checkAuth, setCheckAuth] = useState<string | null>(getRefreshToken());
  const [userInfo, setUserInfo] = useState<UserType | undefined>();
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
  const authRoutes =
    checkAuth && userInfo?.role === "user" ? RoutesGenerator(auth) : null;
  return (
    <>
      <AuthContext.Provider
        value={{ checkAuth, userInfo, setCheckAuth, setUserInfo }}
      >
        {!$refresh.isLoading && (
          <Routes>
            {unAuthRoutes}
            {authRoutes}
            <Route path="*" element={<>404</>} />
          </Routes>
        )}
      </AuthContext.Provider>
    </>
  );
}

export default App;
