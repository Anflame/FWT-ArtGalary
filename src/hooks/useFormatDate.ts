export const useFormatDate = (date: string) => {
  if (!date) return date;
  if (/^\d{3,4}-\d{3,4}$/.test(date)) return date;
  return date
    .split(' – ')
    .map((el) => new Date(el).getFullYear())
    .join(' – ');
};
