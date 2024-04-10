export const applyPageOverflow = (isModalVisible) => {
  const { documentElement } = document;

  documentElement.classList.toggle('modal--visible', isModalVisible);
};

export const isEmailGmail = (email) => email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i);

export const saveToLocalStorage = (preferences) => {
  const { userId } = preferences;

  const stringified = JSON.stringify(preferences);

  localStorage.setItem(userId, stringified);
};

export const loadFromLocalStorage = (userId) => {
  if (userId) {
    const preferences = localStorage.getItem(userId);

    return preferences ? JSON.parse(preferences) : preferences;
  }
};

export const filterTasksByStatus = (tasks, taskStatus) => {
  const filteredTasks = tasks.filter(({ status }) => status === taskStatus);

  return filteredTasks;
};
