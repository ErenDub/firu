import { Tuser } from "modules/login/api/loginType";
import { createContext, useContext } from "react";

export type AuthContent = {
  checkAuth?: string | null;
  userInfo?: Tuser;
  permissions?: Array<string>;
  setCheckAuth: React.Dispatch<React.SetStateAction<string | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<Tuser | undefined>>;
  setPermissions: React.Dispatch<
    React.SetStateAction<Array<string> | undefined>
  >;
  access: (checkPermission: string) => boolean;
};
export const AuthContext = createContext<AuthContent>({
  checkAuth: "",
  userInfo: {
    userName: "",
    email: "",
    role: "",
    _id: "",
    avatar: "",
  },
  permissions: [],
  setCheckAuth: () => null,
  setUserInfo: () => {},
  setPermissions: () => {},
  access: (checkPermission: string) => false,
});
export const useAuthContext = () => useContext(AuthContext);
