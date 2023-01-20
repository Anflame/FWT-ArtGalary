import { TTokens } from '../types';

export type TAuthState = {
  token: TTokens;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
};
