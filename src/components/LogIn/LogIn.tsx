import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import Links from '../Links';
import Input from '../Input';
import Button from '../Button';
import logInImg from '../../assets/images/logInImg.jpg';
import { Context } from '../../hooks/Context';
import { CloseIcon } from '../../assets/icons';

const cx = cn.bind(styles);

type LogInProps = {
  isShowLogIn: boolean;
  setIsShowLogIn: Dispatch<SetStateAction<boolean>>;
  handleLogIn: () => void;
};

export const LogIn: FC<LogInProps> = ({
  isShowLogIn,
  setIsShowLogIn,
  handleLogIn,
}) => {
  const { theme } = Context();
  return (
    <>
      {isShowLogIn && (
        <>
          <section className={cx('logIn')}>
            <div className={cx('logInPopUpContent')}>
              <img
                src={logInImg}
                alt="logInBackground"
                className={cx('logInBackgroundImg')}
              />
              <div className={cx('validationWrapp')}>
                <h2 className={cx('validationHeading')}>Welcome Back</h2>
                <p className={cx('signUp')}>
                  If you don't have an account yet, please{' '}
                  <Links href={'/'} children={'sign in'} />
                </p>
                <form className={cx('validationForm')} onSubmit={handleLogIn}>
                  <label
                    className={cx('validationLabel')}
                    htmlFor={'emailInput'}
                  >
                    Email
                  </label>
                  <Input
                    isError={false}
                    id={'emailInput'}
                    type={'email'}
                    className={'validation'}
                  />
                  <label
                    className={cx('validationLabel')}
                    htmlFor={'passwordInput'}
                  >
                    Password
                  </label>
                  <Input
                    isError={false}
                    id={'passwordInput'}
                    type={'password'}
                    className={'validation'}
                  />
                  <Button className={'logInBtn'} children={'log in'} />
                  <p className={cx('signUp', 'signUpMobile')}>
                    If you don't have an account yet, please{' '}
                    <Links href={'/'} children={'sign in'} />
                  </p>
                </form>
                <CloseIcon
                  onClick={() => setIsShowLogIn(false)}
                  width={16}
                  height={16}
                  fill={theme === 'dark' ? '#575757' : '#9C9C9C'}
                  className={cx('closeIcon')}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
