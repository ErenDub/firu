import { createContext, useContext } from "react";
export type UserType = {
  name: string;
  email: string;
  role: string;
  _id: string;
};
export type AuthContent = {
  checkAuth?: string | null;
  userInfo?: UserType;
  setCheckAuth: React.Dispatch<React.SetStateAction<string | null>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserType | undefined>>;
};
export const AuthContext = createContext<AuthContent>({
  checkAuth: "",
  userInfo: {
    name: "",
    email: "",
    role: "",
    _id: "",
  },
  setCheckAuth: () => null,
  setUserInfo: () => {},
});
export const useAuthContext = () => useContext(AuthContext);
