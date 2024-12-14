import { useState } from 'react';

import {
  addTask as addTaskThunk,
  updateTask as updateTaskThunk,
  deleteTask as deleteTaskThunk,
} from '@/features/tasksSlice';
import { THUNK_STATUS } from '@/constants';

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

  return {
    status,
    createTask,
    updateTask,
    deleteTask
  };
};
