export type TAuthState = {
  tokens: TTokens;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};
