import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { changeAuth, setTokens } from '../store/auth/slice';
import { TTokens } from '../store/types';
import { useAppDispatch } from './useRedux';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  return useEffect(() => {
    if (!Cookies.get('token')) dispatch(changeAuth(false));
    const newTokens: TTokens = JSON.parse(Cookies.get('token') as string);
    dispatch(setTokens(newTokens));
    dispatch(changeAuth(true));
  }, []);
};
