export type Tuser = {
  email: string;
  userName: string;
  role: string;
  avatar: string;
  _id: string;
};

export type TRefresh = {
  tokens: {
    accessToken: string;
  };
  user: Tuser;
};

export type TLogin = {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: Tuser;
};

export type TLogOut = {};
