export type SetIsShow = (isShow?: boolean) => void;

export type CardProps = {
  id: string;
  title: string;
  handleCLick?: () => void;
  img: string;
  year: string;
  isPrimary?: boolean;
};

export type AuthParams = {
  type: string;
  auth: {
    username: string;
    password: string;
    fingerprint: string;
  };
};

export type MenuProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  handleShowAuth: (type?: string | boolean) => void;
};

export type InputsProps = {
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SelectListes = {
  id: number;
  title: string;
  isChecked: boolean;
};
