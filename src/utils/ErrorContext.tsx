import React from 'react';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

import '../index.scss';

type ErrorContextType = {
  message: string;
  showError?: (
    message: string,
    func?: ActionCreatorWithoutPayload<string>,
  ) => void;
};

export const defaultErrorContext: ErrorContextType = {
  message: '',
};

export const ErrorContext =
  React.createContext<ErrorContextType>(defaultErrorContext);
