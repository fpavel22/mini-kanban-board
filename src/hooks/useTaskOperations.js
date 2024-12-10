import { useState } from 'react';

import {
  addTask as addTaskAction,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
} from '@/features/tasksSlice';
import { THUNK_STATUS } from '@/constants';

import { useDispatchUnwrapper } from './useDispatchUnwrapper';

export const useTaskOperations = () => {
  const [ status, setStatus ] = useState(THUNK_STATUS.IDLE);
  const unwrapDispatch = useDispatchUnwrapper();

  async function addTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(addTaskAction(taskDetails));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function updateTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(updateTaskAction(taskDetails));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function deleteTask(taskId) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(deleteTaskAction(taskId));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  return {
    status,
    addTask,
    updateTask,
    deleteTask
  };
};
