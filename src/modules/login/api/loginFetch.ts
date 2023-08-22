import { Request } from "lib/request";

import { TLogin, TRefresh } from "./loginType";

export const refresh = async (refreshObject: { token: string | null }) =>
  Request<TRefresh>("/auth/refresh", "POST", refreshObject);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Request<TLogin>("/auth/refresh", "POST", { email, password });
