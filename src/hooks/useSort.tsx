import { Listes } from '../comon-types';

export const useSort = (array: Listes[], id: string, isUnique?: boolean) => {
  if (isUnique) {
    return array.map((el) => ({
      ...el,
      isChecked: el._id === id,
    }));
  }
  return array.map((el) => ({
    ...el,
    isChecked: el._id === id ? !el.isChecked : el.isChecked,
  }));
};
