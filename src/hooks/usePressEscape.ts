export const usePressEscape = (
  setIsShow: (isShow: boolean) => void,
  isShow: boolean,
) => {
  if (isShow) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsShow(false);
      }
    });
  }
  return document.removeEventListener('keydown', () => setIsShow);
};
