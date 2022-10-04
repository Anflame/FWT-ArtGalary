export type SetIsShow = (isShow?: boolean) => void;

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
  handleShowAuth: (type?: string | boolean) => void;
};

export type InputsProps = {
  id?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  label: string;
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
