export const ClickEscape = (setIsShow: (isShow: boolean) => void) => {
  return () => {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') setIsShow(false);
    });
  };
};
