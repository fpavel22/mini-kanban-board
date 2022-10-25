export const applyPageOverflow = (isModalVisible) => {
  const { documentElement } = document;
  documentElement.classList.toggle('modal--visible', isModalVisible);
};
