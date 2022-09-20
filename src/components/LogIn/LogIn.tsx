import React, { FC } from 'react';
import cn from 'classnames/bind';
import { Context } from '../../hooks/Context';
import Button from '../Button';
import Input from '../Input';
import type { AuthProps } from '../../comon-types';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import logInImg from '../../assets/images/logInImg.jpg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const LogIn: FC<AuthProps> = ({
  isShowLogIn,
  setIsShowLogIn,
  setIsShowSignUp,
  handleLogIn,
}) => {
  const { theme } = Context();
  const goToSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignUp(true);
    setIsShowLogIn(false);
  };

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
                  <button className={cx('goToSignUp')} onClick={goToSignUp}>
                    sign up
                  </button>
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
                  <Button className={'logInSigUpBtn'} children={'log in'} />
                  <p className={cx('signUp', 'signUpMobile')}>
                    If you don't have an account yet, please{' '}
                    <button className={cx('goToSignUp')} onClick={goToSignUp}>
                      sign up
                    </button>
                  </p>
                </form>
                <CloseIcon
                  onClick={() => setIsShowLogIn(false)}
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
