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
};

export type TLogin = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: Tuser;
};
