import { Dispatch, SetStateAction } from 'react';

export type CardProps = {
  id: number;
  title: string;
  handleCLick?: () => void;
  img: string;
  isPrimary?: boolean;
};

export type MenuProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  handleClickLogIn: () => void;
  handleClickSignUp: () => void;
};

export type InputsProps = {
  isError: boolean;
  id?: string;
  type?: string;
  className?: string;
};

export type SelectListes = {
  id: number;
  title: string;
  isChecked: boolean;
};

export type Painters = {
  id: number;
  title: string;
};

export type AuthProps = {
  isShowLogIn?: boolean;
  isShowSignUp?: boolean;
  setIsShowLogIn: Dispatch<SetStateAction<boolean>>;
  setIsShowSignUp: Dispatch<SetStateAction<boolean>>;
  handleLogIn?: () => void;
  handleSignUp?: () => void;
};
