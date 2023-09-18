import { GlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import { toast } from "react-hot-toast";
export type TResponse = { message: string; success: boolean };
export const RequestBlob = async <Result extends TResponse>(
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

  route !== "/user" && route !== "/auth/refresh" && toast.loading("Loading");
  const response = await fetch(envRoute, endBody);

  if (response.ok) {
    const data = await response.blob();

    return data;
  } else {
    const error = (await response.json()) as Result;

    error.message && toast.error(error.message);
    return Promise.reject({
      ...error,
    }) as unknown as Result;
  }
};
