export const dragAndDrop = (
  e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>,
  type: string,
  setDrag: (drag: boolean) => void,
) => {
  e.preventDefault();
  if (type === 'over') {
    setDrag(true);
  }
  if (type === 'leave') {
    setDrag(false);
  }
  return false;
};
