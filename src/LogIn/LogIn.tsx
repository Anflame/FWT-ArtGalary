import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import logInImg from '../assets/images/logInImg.jpg';
import closeIcon from '../assets/images/closeIcon.svg';
import closeIconLight from '../assets/images/closeIconLight.svg';
import Links from '../Links';
import Input from '../Input';
import { Context } from '../hooks/Context';
import Button from '../Button';

const cx = cn.bind(styles);

type LogInProps = {
  isShow: boolean;
  setIsSHow: (isShow: boolean) => void;
  handleLogIn: () => void;
};

export const LogIn: FC<LogInProps> = ({ isShow, setIsSHow, handleLogIn }) => {
  const { theme } = Context();
  return (
    <>
      {isShow && (
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
                <img
                  onClick={() => setIsSHow(!isShow)}
                  src={theme === 'dark' ? closeIcon : closeIconLight}
                  alt="Close"
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
