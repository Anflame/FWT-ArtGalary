import cn from 'classnames/bind';
import { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type BaseButtonProps = {
  handleClick?: () => void;
  className: string;
  children: ReactNode;
  isOutlined?: boolean;
  isFilled?: boolean;
  isDisabled?: boolean;
  args?: HTMLButtonElement;
};

export const Button: FC<BaseButtonProps> = ({
  handleClick,
  className,
  children,
  isOutlined,
  isFilled,
  ...args
}) => (
  <button
    onClick={handleClick}
    disabled={args.isDisabled}
    className={cx(
      'commonBtn',
      className,
      isOutlined && 'btn_outlined',
      isFilled && 'btn_filled',
      args.isDisabled && 'btn_disabled'
    )}
  >
    {children}
  </button>
);
