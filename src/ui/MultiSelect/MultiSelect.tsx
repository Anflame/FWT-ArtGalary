import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import cn from 'classnames/bind';

import CheckBox from '../CheckBox/CheckBox';
import Label from '../Label';

import { useSort } from '../../hooks/useSort';
import { useThemeContext } from '../../hooks/useThemeContext';

import { ReactComponent as Error } from '../../assets/images/error.svg';
import { ReactComponent as IconHide } from '../../assets/images/iconHide.svg';
import { ReactComponent as IconShow } from '../../assets/images/iconShow.svg';

import styles from './styles.module.scss';

import { Listes } from '../../comon-types';

const cx = cn.bind(styles);

type MultiSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  list: Listes[];
  setList: (Listes: Listes[]) => void;
  errorMessage: string | undefined;
};

const MultiSelect = <T extends FieldValues>({
  label,
  name,
  control,
  list,
  setList,
  errorMessage,
}: MultiSelectProps<T>) => {
  const [isShow, setIsShow] = useState(false);
  const { theme } = useThemeContext();

  return (
    <div className={cx('select')}>
      <label htmlFor="selectInput" className={cx('selectTite')}>
        {label}
      </label>
      {errorMessage && (
        <div className={cx('errorText')}>
          {<Error className={cx('errorImg')} fill={'#AE2917'} />}
          <p>{errorMessage}</p>
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <>
            <div
              id="selectInput"
              className={cx(
                'selectInput',
                errorMessage && 'notValidErrorInput',
              )}
            >
              <div className={cx('checkedSelect')}>
                {list.map(({ _id, name: listName, isChecked }: Listes) => {
                  if (isChecked) {
                    return (
                      <Label
                        isDelAllowed={true}
                        children={listName}
                        key={_id}
                        changeSelect={() => {
                          const newValue = useSort(list, _id);
                          const newFilteredValue = newValue.filter(
                            (el) => el.isChecked,
                          ) as typeof value;
                          setList(newValue);
                          onChange(newFilteredValue);
                        }}
                      />
                    );
                  }
                  return '';
                })}
              </div>
              <div
                className={cx('iconWrapp')}
                onClick={() => setIsShow(!isShow)}
              >
                {isShow ? (
                  <IconShow
                    fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                    className={cx('selectIcon')}
                  />
                ) : (
                  <IconHide
                    fill={theme === 'dark' ? '#DEDEDE' : '#575757'}
                    className={cx('selectIcon')}
                  />
                )}
              </div>
            </div>
            {isShow && (
              <ul className={cx('selectList')}>
                {list.map(({ _id, name: listName, isChecked }: Listes) => (
                  <li
                    key={_id}
                    className={cx('selectListes')}
                    onClick={() => {
                      const newValue = useSort(list, _id);
                      const newFilteredValue = newValue.filter(
                        (el) => el.isChecked,
                      ) as typeof value;
                      setList(newValue);
                      onChange(newFilteredValue);
                    }}
                    title={listName}
                  >
                    <CheckBox isChecked={isChecked} />
                    <p className={cx('selectListesTitle')}>{listName}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MultiSelect;
