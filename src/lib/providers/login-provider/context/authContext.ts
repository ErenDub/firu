import { Tuser } from "modules/login/api/loginType";
import { createContext, useContext } from "react";

export type AuthContent = {
  checkAuth?: string | null;
  userInfo?: Tuser;
  setCheckAuth: React.Dispatch<React.SetStateAction<string | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<Tuser | undefined>>;
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
  setCheckAuth: () => null,
  setUserInfo: () => {},
});
export const useAuthContext = () => useContext(AuthContext);
