import { useState } from 'react';

import { THUNK_STATUS } from '@/constants';
import {
  addTask as addTaskThunk,
  deleteTask as deleteTaskThunk,
  updateTask as updateTaskThunk,
} from '@/features/tasksSlice';

import { useDispatchUnwrapper } from './useDispatchUnwrapper';

export const useTaskOperations = () => {
  const [ status, setStatus ] = useState(THUNK_STATUS.IDLE);
  const unwrapDispatch = useDispatchUnwrapper();

  async function createTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(addTaskThunk(taskDetails));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function deleteTask(taskId) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(deleteTaskThunk(taskId));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  async function updateTask(taskDetails) {
    setStatus(THUNK_STATUS.LOADING);

    try {
      await unwrapDispatch(updateTaskThunk(taskDetails));

      setStatus(THUNK_STATUS.SUCCEEDED);
    } catch (err) {
      setStatus(THUNK_STATUS.FAILED);

      throw err;
    }
  }

  return {
    createTask,
    deleteTask,
    status,
    updateTask,
  };
};
