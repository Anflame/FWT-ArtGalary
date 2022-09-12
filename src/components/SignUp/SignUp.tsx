import React, { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { Context } from '../../hooks/Context';
import signUpImg from '../../assets/images/signUpImg.jpg';
import Input from '../Input';
import Button from '../Button';
import { CloseIcon } from '../../assets/icons';

const cx = cn.bind(styles);

type SignUpProps = {
  isShowSignUp: boolean;
  setIsShowSignUp: Dispatch<SetStateAction<boolean>>;
  setIsShowLogIn: Dispatch<SetStateAction<boolean>>;
  handleSignUp: () => void;
};

export const SignUp: FC<SignUpProps> = ({
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
                  <Button className={'logInSigUpBtn'} children={'sign up'} />
                  <p className={cx('logIn', 'logInMobile')}>
                    If you already have an account, please log in
                    <button className={cx('goToLogIn')} onClick={goToLogIn}>
                      log in
                    </button>
                  </p>
                </form>
                <CloseIcon
                  onClick={() => setIsShowSignUp(false)}
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
