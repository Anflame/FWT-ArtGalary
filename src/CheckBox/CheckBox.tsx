import { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import checkedImg from '../assets/images/checkedImg.svg';
import checkedImgLight from '../assets/images/checkedImgLight.svg';
import { Context } from '../hooks/Context';

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
          <img
            className={cx('checkedImg')}
            src={theme === 'dark' ? checkedImg : checkedImgLight}
            alt="checked"
          />
        )}
      </label>
    </>
  );
};
