import { Request } from "lib/request";

import { TRefresh } from "./loginType";

export const refresh = async (refreshObject: { token: string | null }) =>
  Request<TRefresh>("/auth/refresh", "POST", refreshObject);
