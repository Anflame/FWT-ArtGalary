import { useContext } from 'react';

import { ThemeContext } from '../utils/ThemeContext';

export const useThemeContext = () => useContext(ThemeContext);
