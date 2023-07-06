import { useContext, useEffect } from 'react';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import { ErrorContext } from '../utils/ErrorContext';

export const useShowError = (
  error: string,
  newFunc?: ActionCreatorWithoutPayload<string>,
) => {
  const { showError } = useContext(ErrorContext);
  useEffect(() => {
    if (error) showError?.(error, newFunc);
  }, [error]);
};
