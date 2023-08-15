import { GlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import { toast } from "react-hot-toast";
export type TResponse = { message: string; success: boolean };
export const Request = async <Result extends TResponse>(
  route: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
  body: Record<string | number, any> | BodyInit | null
) => {
  const envRoute = `${process.env.REACT_APP_LOCAL_URL1}${route}`;
  const header = GlobalAccessToken;

  const endBody = {
    method: method,
    // credentials: "include",
    ...(method !== "GET" &&
      method !== "DELETE" && {
        body: JSON.stringify(body) ?? null,
      }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  } as any;

  route !== "/users" && route !== "/auth/refresh" && toast.loading("Loading");
  const response = await fetch(envRoute, endBody);

  if (response.ok) {
    const data = (await response.json()) as Result;
    route !== "/users" &&
      route !== "/auth/refresh" &&
      data.message &&
      toast.success(data.message);

    return data;
  } else {
    // if (response.status === 401) {
    //   if (
    //     route !== "/users" &&
    //     route !== "/auth/refresh" &&
    //     window.location.pathname !== "/login/success"
    //   ) {
    //     deleteRefreshToken();
    //     window.location.pathname = "/";
    //     toast("Session timed out");
    //   }
    // }
    const error = (await response.json()) as Result;
    route !== "/users" &&
      route !== "/auth/refresh" &&
      error.message &&
      toast.error(error.message);
    return Promise.reject({
      ...error,
    }) as unknown as Result;
  }
};
