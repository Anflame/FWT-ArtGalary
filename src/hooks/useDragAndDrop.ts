export const useDragAndDrop = (
  e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>,
  type: string,
  drag: boolean,
  setDrag: (drag: boolean) => void,
) => {
  e.preventDefault();
  if (type === 'over') {
    if (!drag) setDrag(true);
  }
  if (type === 'leave') {
    if (drag) setDrag(false);
  }
};
