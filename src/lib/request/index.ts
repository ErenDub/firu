import { GlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import { toast } from "react-hot-toast";
export type TResponse = { message: string; success: boolean; code: number };
export const Request = async <Result>(
  route: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
  body: Record<string | number, any> | BodyInit | null
) => {
  const envRoute = `${process.env.REACT_APP_LOCAL_URL1}${route}`;
  const header = GlobalAccessToken;
  type TLastResponse = {
    data: Result;
  } & TResponse;
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

  route !== "/users" &&
    route !== "/auth/refresh-token" &&
    method === "POST" &&
    toast.loading("Loading");
  const response = await fetch(envRoute, endBody);

  if (response.ok) {
    const data = (await response.json()) as TLastResponse;
    route !== "/users" &&
      route !== "/auth/refresh-token" &&
      data.message &&
      toast.success(data.message);

    return data.data;
  } else {
    const error = (await response.json()) as TLastResponse;
    route !== "/users" &&
      route !== "/auth/refresh-token" &&
      error.message &&
      toast.error(error.message);
    return Promise.reject({
      ...error,
    }) as unknown as Result;
  }
};
