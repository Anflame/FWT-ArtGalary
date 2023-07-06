import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cn from 'classnames/bind';

import { BtnVariants } from '../../variants';

import styles from './styles.module.scss';

const cx = cn.bind(styles);

type BaseButtonProps = {
  handleClick?: () => void;
  variant: BtnVariants;
  className?: string;
  children: ReactNode;
  isOutlined?: boolean;
  isFilled?: boolean;
};

const Button: FC<BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  handleClick,
  variant,
  className,
  children,
  isOutlined,
  isFilled,
  ...args
}) => {
  const { disabled } = args;
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cx(
        'commonBtn',
        variant,
        isOutlined && 'btn_outlined',
        isFilled && 'btn_filled',
        disabled && 'btn_disabled',
        className,
      )}
      {...args}
    >
      {children}
    </button>
  );
};

export default Button;
