import { FC } from 'react';
import cn from 'classnames/bind';
import { Context } from '../../hooks/Context';
import { ReactComponent as CheckedImg } from '../../assets/images/checkedImg.svg';
import styles from './styles.module.scss';

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
        readOnly
      />
      <label htmlFor="checkBox" className={cx('checkBoxLabel')}>
        {isChecked && (
          <CheckedImg fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
        )}
      </label>
    </>
  );
};
