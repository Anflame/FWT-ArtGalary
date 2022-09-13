import { FC, useState } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import CheckBox from '../CheckBox';
import Label from '../Label';
import type { SelectListes } from '../../comon-types';
import { Context } from '../../hooks/Context';
import { MultiSelectIcon, MultiSelectIconShow } from '../../assets/icons';

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
  const { theme } = Context();

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
          {isShow ? (
            <MultiSelectIconShow
              width={12}
              height={6}
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('selectIcon')}
            />
          ) : (
            <MultiSelectIcon
              width={12}
              height={6}
              fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
              className={cx('selectIcon')}
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
