export const overflowHidden = (isShow: boolean) => {
  if (isShow) document.body.classList.add('overflowHidden');
  else document.body.classList.remove('overflowHidden');
};
