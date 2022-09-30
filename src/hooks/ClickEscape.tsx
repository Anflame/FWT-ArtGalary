export const ClickEscape = <T,>(
  setIsShow: (isShow?: boolean | undefined) => void,
) => {
  return () => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape') setIsShow(false);
    });
  };
};
