import { FC, useContext, useState } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { SelectListes } from '../comon-types';
import CheckBox from '../CheckBox';
import Label from '../Label';
import multiSelectIcon from '../assets/images/multiSelectIcon.svg';
import multiSelectIconShow from '../assets/images/multiSelectIconShow.svg';
import multiSelectIconLight from '../assets/images/multiSelectIconLight.svg';
import multiSelectIconShowLight from '../assets/images/multiSelectIconShowLight.svg';
import { ThemeContext } from '../utils/ThemeContext';

const cx = cn.bind(styles);

type MultiSelectProps = {
  selectList: SelectListes[];
  changeSelect: () => void;
};

export const MultiSelect: FC<MultiSelectProps> = ({
  selectList,
  changeSelect,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cx('select')}>
      <label htmlFor="selectInput" className={cx('selectTite')}>
        Field name
      </label>
      <div id="selectInput" className={cx('selectInput')}>
        <div className={cx('checkedSelect')}>
          {selectList.map(({ id, title, isChecked }) => {
            if (isChecked) {
              return (
                <Label
                  isDelAllowed={true}
                  children={title}
                  key={id}
                  changeSelect={() => changeSelect}
                />
              );
            }
            return '';
          })}
        </div>
        <div className={cx('iconWrapp')} onClick={() => setIsShow(!isShow)}>
          {theme === 'dark' ? (
            <img
              className={cx('selectIcon')}
              src={isShow ? multiSelectIconShow : multiSelectIcon}
              alt="showIcon"
            />
          ) : (
            <img
              className={cx('selectIcon')}
              src={isShow ? multiSelectIconShowLight : multiSelectIconLight}
              alt="showIcon"
            />
          )}
        </div>
      </div>
      {isShow && (
        <ul className={cx('selectList')}>
          {selectList.map(({ id, title, isChecked }) => (
            <li key={id} className={cx('selectListes')} onClick={changeSelect}>
              <CheckBox isChecked={isChecked} />
              <p className={cx('selectListesTitle')}>{title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
