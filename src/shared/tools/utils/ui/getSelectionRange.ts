const getSelectionRange = (): Range => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;

  return selection.getRangeAt(0);
};

export default getSelectionRange;
