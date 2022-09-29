import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import Input from '../Input';
import { ClickEscape } from '../../hooks/ClickEscape';
import { Context } from '../../hooks/Context';
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
  const { theme } = Context();
  const goToLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowSignUp(false);
    setIsShowLogIn(true);
  };
  const handleClickEscape = ClickEscape(setIsShowLogIn);

  useEffect(() => {
    handleClickEscape();
    return document.removeEventListener('keydown', () =>
      setIsShowSignUp(false),
    );
  }, []);

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
                  <Input
                    id={'emailInput'}
                    type={'email'}
                    className={'validation'}
                    label={'Email'}
                  />
                  <Input
                    id={'passwordInput'}
                    type={'password'}
                    className={'validation'}
                    label={'Password'}
                  />
                  <Button className={'defaultBtn'}>sign up</Button>
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
