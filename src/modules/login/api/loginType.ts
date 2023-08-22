import { TResponse } from "lib/request";
export type Tuser = {
  email: string;
  userName: string;
  role: string;
  avatar: string;
  _id: string;
};

export type TRefresh = {
  accessToken: string;
  user: Tuser;
} & TResponse;

export type TLogin = {
  accessToken: string;
  refreshToken: string;
  user: Tuser;
} & TResponse;
