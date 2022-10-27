export const applyPageOverflow = (isModalVisible) => {
  const { documentElement } = document;

  documentElement.classList.toggle('modal--visible', isModalVisible);
};

export const isEmailGmail = (email) => {
  return email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i);
};

export const saveToLocalStorage = (userId, darkMode, sidebarVisible) => {
  const setup = {
    userId,
    darkMode,
    sidebarVisible
  };

  const stringified = JSON.stringify(setup);

  localStorage.setItem(userId, stringified);
};

export const loadFromLocalStorage = (userId) => {
  if (userId) {
    const setup = localStorage.getItem(userId);
    const parsed = JSON.parse(setup);
  
    return parsed;
  }
};
