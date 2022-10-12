export const addFile = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.DragEvent<HTMLDivElement>
    | React.DragEvent<HTMLElement>,
) => {
  e.preventDefault();
  let files;
  if ('files' in e.target && e.target.files?.length === 1) {
    files = e.target.files;
  } else if ('dataTransfer' in e && e.dataTransfer.files.length === 1) {
    files = e.dataTransfer.files;
  }
  if (
    files &&
    (files[0].type === 'image/png' || files[0].type === 'image/jpeg') &&
    files[0].size <= 3145728
  ) {
    return files[0];
  }
  return false;
};
