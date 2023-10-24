import { Request } from "lib/request";

import { TLogOut, TLogin, TRefresh } from "./loginType";
import { RegistrationFormFields } from "pages/auth/registration";

export const refresh = async (refreshObject: { token: string | null }) =>
  Request<TRefresh>("/auth/refresh-token", "POST", refreshObject, true);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Request<TLogin>("/auth/sign-in", "POST", { email, password }, true);

export const registration = async (data: RegistrationFormFields) =>
  Request<TLogin>("/auth/sign-up", "POST", data, true);

export const logout = async (refreshObject: { refreshToken: string }) =>
  Request<TLogOut>("/auth/logout", "DELETE", refreshObject, true);
