import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, Dropdown, TextField } from '@/components';
import { selectedTaskSelector } from '@/features/tasksSlice';
import { useModalState, useTaskOperations } from '@/hooks';
import { TASK_PRIORITY_OPTIONS, THUNK_STATUS } from '@/constants';

import './task-form.scss';

const DEFAULT_CARD_STATUS = 'to_do';

export const TaskForm = ({
  closeModal,
  darkMode,
  editing,
  user
}) => {
  const selectedTask = useSelector(selectedTaskSelector);

  const [ fieldsValue, setFieldsValue ] = useState({
    description: editing ? selectedTask.description : '',
    priority: editing ? selectedTask.priority : 'normal',
    subtasks: editing ? selectedTask.subtasks : [],
    title: editing ? selectedTask.title : ''
  });

  const [ fieldsError, setFieldsError ] = useState({
    descriptionError: null,
    subtasksError: null,
    titleError: null
  });

  const { showViewDialog } = useModalState();
  const { createTask, status: localStatus, updateTask } = useTaskOperations();

  const { boardId } = useParams();

  const {
    description,
    priority,
    subtasks,
    title
  } = fieldsValue;
  const { descriptionError, subtasksError, titleError } = fieldsError;

  const isCreating = localStatus === THUNK_STATUS.LOADING;

  function handleFormFieldsChange({ target }) {
    const { name, value } = target;

    setFieldsValue((prevState) => ({ ...prevState, [ name ]: value }));
  }

  function addSubtask() {
    const subtask = {
      id: uuidv4(),
      completed: false,
      value: ''
    };

    setFieldsValue((prevState) => ({
      ...prevState,
      subtasks: [ ...prevState.subtasks, subtask ]
    }));
  }

  function changeSubtaskValue(id) {
    return (event) => {
      const { target: { value } } = event;

      const updatedSubtasks = subtasks.map((subtask) => (
        subtask.id === id ? { ...subtask, value } : subtask
      ));

      setFieldsValue((prevState) => ({
        ...prevState,
        subtasks: updatedSubtasks
      }));
    };
  }

  function removeSubtask(id) {
    return () => {
      const updatedSubtasks = subtasks.filter(({ id: taskId }) => taskId !== id);

      setFieldsValue((prevState) => ({
        ...prevState,
        subtasks: updatedSubtasks
      }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const emptySubtasks = subtasks.filter(({ value }) => !value);

    if ([ title, description, emptySubtasks.length === 0 ].every(Boolean)) {
      const taskDetails = {
        id: editing ? selectedTask.id : null,
        pageId: boardId,
        createdBy: editing ? selectedTask.createdBy : user.uid,
        title,
        description,
        subtasks,
        status: editing ? selectedTask.status : DEFAULT_CARD_STATUS,
        priority
      };

      const taskAction = editing ? updateTask : createTask;

      taskAction(taskDetails).then(() => {
        closeModal?.();
      });
    } else {
      const subtasksIds = emptySubtasks.map(({ id }) => id);

      setFieldsError((prevState) => ({
        ...prevState,
        titleError: !title,
        descriptionError: !description,
        subtasksError: subtasksIds
      }));
    }
  }

  return (
    <form className="form task__form" onSubmit={ handleSubmit }>
      { editing
        && <span className="task__form--go-back" onClick={ showViewDialog }>&#x2190; Go back</span> }
      <h2 className="form__title">Add New Task</h2>
      <div className="form__group">
        <p className="form__group-title">Title</p>
        <TextField
          darkMode={ darkMode }
          error={ titleError }
          name="title"
          placeholder="e.g. Make coffee"
          value={ title }
          onChange={ handleFormFieldsChange }
        />
      </div>
      <div className="form__group">
        <p className="form__group-title">Description</p>
        <TextField
          darkMode={ darkMode }
          error={ descriptionError }
          multiline={ true }
          name="description"
          onChange={ handleFormFieldsChange }
          placeholder="e.g. Make coffee"
          value={ description }
        />
      </div>
      <div className="form__group task__form-group--subtasks">
        <p className="form__group-title">Subtasks</p>
        { subtasks.map(({ id, value }) => (
          <TextField
            closable={ true }
            darkMode={ darkMode }
            error={ subtasksError?.includes(id) }
            key={ id }
            onChange={ changeSubtaskValue(id) }
            onIconCloseClick={ removeSubtask(id) }
            value={ value }
          />
        )) }
      </div>
      <div className="form__group">
        <Button onClick={ addSubtask } type="button" variety="secondary">+ Add Subtask</Button>
      </div>
      <div className="form__group">
        <p className="form__group-title">Priority</p>
        <Dropdown
          darkMode={ darkMode }
          name="priority"
          onChange={ handleFormFieldsChange }
          options={ TASK_PRIORITY_OPTIONS }
          value={ priority }
        />
      </div>
      <Button disabled={ isCreating } variety="primary">
        { isCreating
          ? 'Please wait...'
          : `${ editing ? 'Save' : 'Create' } Task` }
      </Button>
    </form>
  );
};
