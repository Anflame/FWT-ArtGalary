import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { Context } from '../../hooks/Context';
import { CheckedImg } from '../../assets/icons';

const cx = cn.bind(styles);

type CheckBoxProps = {
  isChecked: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({ isChecked }) => {
  const { theme } = Context();
  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        className={cx('checkbox')}
        id="checkBox"
      />
      <label htmlFor="checkBox" className={cx('checkBoxLabel')}>
        {isChecked && (
          <CheckedImg
            width={18}
            height={14}
            fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
          />
        )}
      </label>
    </>
  );
};
