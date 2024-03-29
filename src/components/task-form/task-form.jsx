import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@components/button';
import { Dropdown } from '@components/dropdown';
import { TextField } from '@components/text-field';
import { closeModal, openModal } from '@/features/modalSlice';
import { setTask, selectedTaskSelector } from '@/features/tasksSlice';
import { userSelector } from '@/features/userSlice';
import { DEFAULT_CARD_STATUS, MODAL_CONTENT, THUNK_STATUS } from '@/constants';

export const TaskForm = ({ editing }) => {
  const selectedTask = useSelector(selectedTaskSelector);

  const [ localStatus, setLocalStatus ] = useState(THUNK_STATUS.IDLE);
  const [ fieldsValue, setFieldsValue ] = useState({
    title: editing ? selectedTask.title : '',
    description: editing ? selectedTask.description : '',
    subtasks: editing ? selectedTask.subtasks : [],
    priority: editing ? selectedTask.priority : 'normal'
  });

  const [ fieldsError, setFieldsError ] = useState({
    titleError: null,
    descriptionError: null,
    subtasksError: null
  });

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const {
    title,
    description,
    subtasks,
    priority
  } = fieldsValue;
  const { titleError, descriptionError, subtasksError } = fieldsError;

  function goBack() {
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }

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
      try {
        setLocalStatus(THUNK_STATUS.LOADING);

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

        const dispatchResult = await dispatch(setTask(taskDetails));

        if (dispatchResult.type === setTask.fulfilled.toString()) {
          setLocalStatus(THUNK_STATUS.IDLE);
        } else {
          setLocalStatus(THUNK_STATUS.FAILED);
        }
      } catch (error) {
        setLocalStatus(THUNK_STATUS.FAILED);
      } finally {
        dispatch(closeModal());
      }
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
        && <span className="task__form--go-back" onClick={ goBack }>&#x2190; Go back</span> }
      <h2 className="form__title">Add New Task</h2>
      <div className="form__group">
        <p className="form__group-title">Title</p>
        <TextField
          placeholder="e.g. Make coffee"
          name="title"
          value={ title }
          error={ titleError }
          onChange={ handleFormFieldsChange }
        />
      </div>
      <div className="form__group">
        <p className="form__group-title">Description</p>
        <TextField
          placeholder="e.g. Make coffee"
          name="description"
          multiline={ true }
          value={ description }
          error={ descriptionError }
          onChange={ handleFormFieldsChange }
        />
      </div>
      <div className="form__group task__form-group--subtasks">
        <p className="form__group-title">Subtasks</p>
        { subtasks.map(({ id, value }) => (
          <TextField
            key={ id }
            closable={ true }
            value={ value }
            error={ subtasksError?.includes(id) }
            onClick={ removeSubtask(id) }
            onChange={ changeSubtaskValue(id) }
          />
        )) }
      </div>
      <div className="form__group">
        <Button variety="secondary" type="button" onClick={ addSubtask }>+ Add Subtask</Button>
      </div>
      <div className="form__group">
        <p className="form__group-title">Priority</p>
        <Dropdown name="priority" value={ priority } onChange={ handleFormFieldsChange } />
      </div>
      <Button variety="primary" disabled={ localStatus === THUNK_STATUS.LOADING }>
        { localStatus === THUNK_STATUS.LOADING
          ? 'Please wait...'
          : `${ editing ? 'Save' : 'Create' } Task` }
      </Button>
    </form>
  );
};
