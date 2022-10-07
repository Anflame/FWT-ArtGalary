export type SetIsShow = (isShow?: boolean) => void;

export type CardProps = {
  id: string;
  title: string;
  handleCLick?: () => void;
  img: string;
  isPrimary?: boolean;
};

export type TPainters = {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v: number;
  mainPainting: {
    _id: string;
    name: string;
    yearOfCreation: string;
    image: {
      _id: string;
      src: string;
      webp: string;
      src2x: string;
      webp2x: string;
      original: string;
    };
    artist: string;
  };
};

export type AuthParams = {
  type: string;
  auth: {
    username: string;
    password: string;
    fingerprint: string;
  };
};

export type TAuth = {
  isAuth?: boolean;
  accessToken: string;
  refreshToken: string;
  fingerprint?: string;
};

export type MenuProps = {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  handleShowAuth: (type?: string | boolean) => void;
};

export type InputsProps = {
  id?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  args?: HTMLInputElement;
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
