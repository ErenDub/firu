import { UserType } from "lib/providers/login-provider/context/authContext";
import { TResponse } from "lib/request";

export type TRefresh = {
  accessToken: string;
  user: UserType;
} & TResponse;
