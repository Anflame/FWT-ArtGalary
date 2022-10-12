import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type BaseButtonProps = {
  handleClick?: () => void;
  className?: string;
  children: ReactNode;
  isOutlined?: boolean;
  isFilled?: boolean;
};

export const Button: FC<
  BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ handleClick, className, children, isOutlined, isFilled, ...args }) => {
  const { disabled } = args;
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cx(
        'commonBtn',
        className,
        isOutlined && 'btn_outlined',
        isFilled && 'btn_filled',
        disabled && 'btn_disabled',
      )}
    >
      {children}
    </button>
  );
};
