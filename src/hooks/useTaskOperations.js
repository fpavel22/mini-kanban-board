import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectedTaskSelector,
  addTask,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction
} from '@/features/tasksSlice';
import { THUNK_STATUS } from '@/constants';

import { useDispatchUnwrapper } from './useDispatchUnwrapper';

export const useTaskOperations = () => {
  const [ status, setStatus ] = useState(false);
  const selectedTask = useSelector(selectedTaskSelector);
  const unwrapDispatch = useDispatchUnwrapper();

  async function createTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(addTask(taskDetails));

      setStatus(THUNK_STATUS.IDLE);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function updateTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(updateTaskAction(taskDetails));

      setStatus(THUNK_STATUS.IDLE);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function deleteTask(taskId) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(deleteTaskAction(taskId));

      setStatus(THUNK_STATUS.IDLE);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  function updateSubtaskStatus(subtaskId) {
    return async (event) => {
      setStatus(THUNK_STATUS.LOADING);

      try {
        const { checked } = event.target;

        const updatedSubtasks = selectedTask.subtasks.map((subtask) => (
          subtask.id === subtaskId ? { ...subtask, completed: checked } : subtask
        ));

        const taskData = {
          ...selectedTask,
          subtasks: updatedSubtasks
        };

        await unwrapDispatch(updateTaskAction(taskData));

        setStatus(THUNK_STATUS.IDLE);
      } catch (err) {
        setStatus(THUNK_STATUS.FAILED);

        throw err;
      }
    };
  }

  return {
    status,
    createTask,
    updateTask,
    deleteTask,
    updateSubtaskStatus
  };
};
