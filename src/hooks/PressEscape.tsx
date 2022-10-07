export const PressEscape = (setIsShow: (isShow: boolean) => void) => {
  return () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') setIsShow(false);
    });
  };
};
