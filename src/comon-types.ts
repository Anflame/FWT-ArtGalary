export type CardProps = {
  id: number;
  title: string;
  name: string;
  handleCLick?: () => void;
  img: string;
  className?: string;
  isPrimary?: boolean;
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
