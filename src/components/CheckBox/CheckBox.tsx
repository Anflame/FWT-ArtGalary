import { FC } from 'react';
import { useCookies } from 'react-cookie';
import cn from 'classnames/bind';
import { ReactComponent as CheckedImg } from '../../assets/images/checkedImg.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

type CheckBoxProps = {
  isChecked: boolean;
};

export const CheckBox: FC<CheckBoxProps> = ({ isChecked }) => {
  const [{ theme }] = useCookies();
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
          <CheckedImg fill={theme === 'dark' ? '#DEDEDE' : '#575757'} />
        )}
      </label>
    </>
  );
};
