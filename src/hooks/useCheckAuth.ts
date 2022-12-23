import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { changeAuth, setTokens } from '../store/auth/slice';
import { TTokens } from '../store/auth/types';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector(
    ({ auth: { tokens } }) => tokens,
  );
  const { isAuth } = useAppSelector(({ auth }) => auth);
  return useEffect(() => {
    if (!Cookies.get('tokens')) return;
    if ((!accessToken || !refreshToken) && !isAuth) {
      const newTokens: TTokens = JSON.parse(Cookies.get('tokens') as string);
      dispatch(setTokens(newTokens));
      dispatch(changeAuth(true));
    }
  }, [accessToken, refreshToken]);
};
