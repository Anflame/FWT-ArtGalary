import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import type { AuthProps } from '../../comon-types';
import { ReactComponent as CloseIcon } from '../../assets/images/closeIcon.svg';
import signUpImg from '../../assets/images/signUpImg.jpg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

export const SignUp: FC<AuthProps> = ({
  isShowSignUp,
  setIsShowSignUp,
  setIsShowLogIn,
  handleSignUp,
}) => {
  const [{ theme }] = useCookies();
  const goToLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignUp(false);
    setIsShowLogIn(true);
  };

  return (
    <>
      {isShowSignUp && (
        <>
          <section className={cx('signUp')}>
            <div className={cx('signUpPopUpContent')}>
              <img
                src={signUpImg}
                alt="signUpBackground"
                className={cx('signUpBackgroundImg')}
              />
              <div className={cx('validationWrapp')}>
                <h2 className={cx('validationHeading')}>Create your profile</h2>
                <p className={cx('logIn')}>
                  If you already have an account, please{' '}
                  <button className={cx('goToLogIn')} onClick={goToLogIn}>
                    log in
                  </button>
                </p>
                <form className={cx('validationForm')} onSubmit={handleSignUp}>
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
                  <Button className={'logInSigUpBtn'}>sign up</Button>
                  <p className={cx('logIn', 'logInMobile')}>
                    If you already have an account, please log in
                    <button className={cx('goToLogIn')} onClick={goToLogIn}>
                      log in
                    </button>
                  </p>
                </form>
                <CloseIcon
                  onClick={() => setIsShowSignUp(false)}
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
