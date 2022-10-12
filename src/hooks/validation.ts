export const validation = (
  inputType: string,
  inputValue: string,
  setError: (isError: boolean) => void,
  setErrorMessage: (text: string) => void,
) => {
  if (!inputValue) {
    setError(true);
    setErrorMessage('Заполните поле');
  } else if (inputValue.length > 25) {
    setError(true);
    setErrorMessage('Длина поля должно быть меньше 25');
  } else if (inputType === 'email' && !/^.+@.+\..+$/i.test(inputValue)) {
    setError(true);
    setErrorMessage('Не корректный email');
  } else if (
    inputType === 'password' &&
    !/(?=.*[0-9])(?=.*[\W])(?=.*[a-z])(?=.*[A-Z]){8,}/g.test(inputValue)
  ) {
    setError(true);
    setErrorMessage(
      'Пароль должен иметь больше 8 символов, заглавную букву, цифру и спец. символ',
    );
  } else if (inputType === 'year' && !/^(\d)+(-)?$/.test(String(inputValue))) {
    setError(true);
    setErrorMessage('Не корректная дата');
  } else {
    setError(false);
  }
};
