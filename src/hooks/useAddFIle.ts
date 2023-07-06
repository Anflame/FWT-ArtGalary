import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export const useAddFile = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.DragEvent<HTMLDivElement>
    | React.DragEvent<HTMLElement>,
  setImage: (file: File) => void,
  setPreviewUrl: (url: string) => void,
  setDrag: (isSHow: boolean) => void,
  showError:
    | ((
        message: string,
        func?: ActionCreatorWithoutPayload<string> | undefined,
      ) => void)
    | undefined,
) => {
  e.preventDefault();
  let file;
  if ('files' in e.target && e.target.files?.length === 1) {
    ({ 0: file } = e.target.files);
  } else if ('dataTransfer' in e && e.dataTransfer.files.length === 1) {
    ({ 0: file } = e.dataTransfer.files);
  }
  if (
    file &&
    (file.type === 'image/png' || file.type === 'image/jpeg') &&
    file.size <= 3145728
  ) {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDrag(false);
  } else {
    showError?.('Не корректное изображение');
    setDrag(false);
  }
};
