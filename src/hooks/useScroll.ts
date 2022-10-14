export function useUnScroll(isShow?: boolean) {
  if (isShow && !document.body.classList.contains('overflowHidden'))
    document.body.classList.add('overflowHidden');
  else if (!isShow) document.body.classList.remove('overflowHidden');
}
