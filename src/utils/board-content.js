export const filterTasksByStatus = (tasks, taskStatus) => {
  const filteredTasks = tasks.filter(({ status }) => status === taskStatus);

  return filteredTasks;
};
