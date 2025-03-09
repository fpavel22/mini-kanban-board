import { useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, Dropdown, TextField } from '@/components';
import { BUTTON_VARIETIES, TASK_PRIORITY_OPTIONS, THUNK_STATUS } from '@/constants';
import { selectedTaskSelector } from '@/features/tasksSlice';
import { useModalState, useTaskOperations } from '@/hooks';

import './task-form.scss';

const DEFAULT_CARD_STATUS = 'to_do';

const TASK_FORM_PAYLOAD = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  FIELD_CHANGE: 'FIELD_CHANGE',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  SUBTASK_CHANGE_VALUE: 'SUBTASK_CHANGE_VALUE'
};

const taskFormReducer = (state, { type, payload }) => {
  switch (type) {
    case TASK_FORM_PAYLOAD.ADD_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.concat(payload.newSubtask)
      };
    case TASK_FORM_PAYLOAD.FIELD_CHANGE:
      return {
        ...state,
        [ payload.name ]: payload.value
      };
    case TASK_FORM_PAYLOAD.REMOVE_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.filter(({ id }) => id !== payload.subtaskId)
      };
    case TASK_FORM_PAYLOAD.SUBTASK_CHANGE_VALUE:
      return {
        ...state,
        subtasks: state.subtasks.map((subtask) => {
          if (subtask.id === payload.id) {
            return {
              ...subtask,
              value: payload.subtaskValue
            };
          }

          return subtask;
        })
      };
    default:
      return state;
  }
};

export const TaskForm = ({
  closeModal,
  darkMode,
  editing,
  user
}) => {
  const selectedTask = useSelector(selectedTaskSelector);

  const [ fieldValues, dispatch ] = useReducer(taskFormReducer, {
    description: editing ? selectedTask.description : '',
    priority: editing ? selectedTask.priority : 'normal',
    subtasks: editing ? selectedTask.subtasks : [],
    title: editing ? selectedTask.title : ''
  });

  const [ fieldErrors, setFieldErrors ] = useState({
    description: null,
    subtasks: [],
    title: null
  });

  const { showViewDialog } = useModalState();
  const { createTask, status: localStatus, updateTask } = useTaskOperations();

  const { boardId } = useParams();

  const isCreating = localStatus === THUNK_STATUS.LOADING;

  function handleFormFieldsChange({ target }) {
    const { name, value } = target;

    dispatch({
      type: TASK_FORM_PAYLOAD.FIELD_CHANGE,
      payload: { name, value }
    });
  }

  function addSubtask() {
    const newSubtask = {
      id: uuidv4(),
      completed: false,
      value: ''
    };

    dispatch({
      type: TASK_FORM_PAYLOAD.ADD_SUBTASK,
      payload: { newSubtask }
    });
  }

  function changeSubtaskValue(id) {
    return ({ target: { value } }) => {
      dispatch({
        type: TASK_FORM_PAYLOAD.SUBTASK_CHANGE_VALUE,
        payload: { id, subtaskValue: value }
      });
    };
  }

  function removeSubtask(id) {
    return () => {
      dispatch({
        type: TASK_FORM_PAYLOAD.REMOVE_SUBTASK,
        payload: { subtaskId: id }
      });
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { subtasks, ...restFields } = fieldValues;
    const emptySubtasks = subtasks.filter(({ value }) => !value);

    if ([ ...Object.values(restFields), emptySubtasks.length === 0 ].every(Boolean)) {
      const taskDetails = {
        ...fieldValues,
        createdBy: editing ? selectedTask.createdBy : user.uid,
        id: editing ? selectedTask.id : null,
        pageId: boardId,
        status: editing ? selectedTask.status : DEFAULT_CARD_STATUS,
      };

      const taskOperation = editing ? updateTask : createTask;

      taskOperation(taskDetails).then(() => {
        closeModal?.();
      });
    } else {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        title: !fieldValues.title,
        description: !fieldValues.description,
        subtasks: emptySubtasks.map(({ id }) => id)
      }));
    }
  }

  return (
    <form className="form task__form" onSubmit={ handleSubmit }>
      { editing && <span className="task__form--go-back" onClick={ showViewDialog }>&#x2190; Go back</span> }
      <h2 className="form__title">
        { editing ? 'Edit' : 'Add New' }
        {' '}
        Task
      </h2>
      <div className="form__group">
        <p className="form__group-title">Title</p>
        <TextField
          darkMode={ darkMode }
          error={ fieldErrors.title }
          name="title"
          placeholder="e.g. Make coffee"
          value={ fieldValues.title }
          onChange={ handleFormFieldsChange }
        />
      </div>
      <div className="form__group">
        <p className="form__group-title">Description</p>
        <TextField
          darkMode={ darkMode }
          error={ fieldErrors.description }
          multiline
          name="description"
          onChange={ handleFormFieldsChange }
          placeholder="e.g. Make coffee"
          value={ fieldValues.description }
        />
      </div>
      <div className="form__group task__form-group--subtasks">
        <p className="form__group-title">Subtasks</p>
        { fieldValues.subtasks.map(({ id, value }) => (
          <TextField
            closable
            darkMode={ darkMode }
            error={ fieldErrors.subtasks.includes(id) }
            key={ id }
            onChange={ changeSubtaskValue(id) }
            onIconCloseClick={ removeSubtask(id) }
            value={ value }
          />
        )) }
      </div>
      <div className="form__group">
        <Button onClick={ addSubtask } type="button" variety={ BUTTON_VARIETIES.SECONDARY }>+ Add Subtask</Button>
      </div>
      <div className="form__group">
        <p className="form__group-title">Priority</p>
        <Dropdown
          darkMode={ darkMode }
          name="priority"
          onChange={ handleFormFieldsChange }
          options={ TASK_PRIORITY_OPTIONS }
          value={ fieldValues.priority }
        />
      </div>
      <Button disabled={ isCreating } variety={ BUTTON_VARIETIES.PRIMARY }>
        { isCreating
          ? 'Please wait...'
          : `${ editing ? 'Save' : 'Create' } Task` }
      </Button>
    </form>
  );
};
