import { Listes } from '../comon-types';

export const useSort = (
  array: Listes[],
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  isUnique?: boolean,
) => {
  if (isUnique) {
    return array.map((el) => {
      if (el.name === e.currentTarget.title) el.isChecked = !el.isChecked;
      else if (el.isChecked) el.isChecked = !el.isChecked;
      return el;
    });
  }
  return array.map((el) => {
    if (el.name === e.currentTarget.textContent) el.isChecked = !el.isChecked;
    return el;
  });
};
