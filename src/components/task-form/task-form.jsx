import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { TextField } from '../text-field';
import { toggleTaskForm, toggleTaskView } from '../../features/modalSlice';
import { tasksSliceSelectors, setTask } from '../../features/tasksSlice';
import { useSetDocument } from '../../hooks';
import { TEXTAREA_PLACEHOLDER, FIREBASE_COLLECTIONS, THUNK_STATUS } from '../../constants';

export const TaskForm = ({ editTask }) => {
  const [ taskStatus, setTaskStatus ] = useState(THUNK_STATUS.IDLE);
  const { selectedTaskSelector } = tasksSliceSelectors;

  const selectedTask = useSelector(selectedTaskSelector);

  const [ formFieldsState, setFormFieldsState ] = useState({
    title: editTask ? selectedTask.title : '',
    description: editTask ? selectedTask.description : '',
    subtasks: editTask ? selectedTask.subtasks : [],
    status: editTask ? selectedTask.status : 'to_do'
  });

  const [ errors, setErrors ] = useState({
    title: false,
    description: false,
    subtasks: []
  });

  const dispatch = useDispatch();
  const { boardId } = useParams();
  const { setDocument } = useSetDocument(FIREBASE_COLLECTIONS.TASKS);
  
  const { title, description, subtasks, status } = formFieldsState;

  function handleGoBack() {
    dispatch(toggleTaskView(true));
  }

  function handleFormFieldsChange({ target: { name, value } }) {
    setFormFieldsState((prevState) => ({ ...prevState, [ name ]: value }));
  }

  function addNewSubtask(event) {
    event.preventDefault();

    const newSubtask = {
      id: uuidv4(),
      value: '',
      completed: false
    };

    setFormFieldsState((prevState) => ({
      ...prevState,
      subtasks: [ ...prevState.subtasks, newSubtask ]
    }));
  }

  function removeSubtask(fieldId) {
    const updatedSubtasks = subtasks.filter(({ id }) => id !== fieldId);

    setFormFieldsState((prevState) => ({
      ...prevState,
      subtasks: updatedSubtasks
    }));
  }

  function handleSubtaskValueChange({ target: { value } }, fieldId) {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === fieldId ? { ...subtask, value } : subtask);

    setFormFieldsState((prevState) => ({ ...prevState, subtasks: updatedSubtasks }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const isTitleValid = Boolean(title);
    const isDescriptionValid = Boolean(description);
    const emptySubtasks = subtasks.filter(({ value }) => !value);

    if (isTitleValid && isDescriptionValid && emptySubtasks.length === 0) {
      try {
        const thunkArgs = {
          taskDetails: {
            id: editTask ? selectedTask.id : null,
            pageId: boardId,
            title,
            description,
            subtasks,
            status
          },
          setDocument
        }
        setTaskStatus(THUNK_STATUS.LOADING);

        await dispatch(setTask(thunkArgs));
      } catch(error) {
        setTaskStatus(THUNK_STATUS.FAILED);
      } finally {
        setTaskStatus(THUNK_STATUS.IDLE);
      }
      dispatch(toggleTaskForm({ addNewTask: false, editTask: false }));
    } else {
      const errorSubtasksIds = emptySubtasks.map(({ id }) => id);

      setErrors((prevState) => ({
        ...prevState,
        title: !isTitleValid,
        description: !isDescriptionValid,
        subtasks: errorSubtasksIds
      }));
    }
  }

  return (
    <form className="form task__form" onSubmit={ handleFormSubmit }>
      { editTask &&
        <span className="task__form--go-back" onClick={ handleGoBack }>&#x2190; Go back</span> }
      <h2 className="form__title">{ editTask ? "Edit" : "Add New" } Task</h2>
      <div className="form__group">
        <p className="form__group-title">Title</p>
        <TextField placeholder="e.g. Make coffee"
            name="title"
            value={ title }
            error={ errors.title }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="form__group">
        <p className="form__group-title">Description</p>
        <TextField multiline={ true }
            placeholder={ TEXTAREA_PLACEHOLDER }
            name="description"
            value={ description }
            error={ errors.description }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="form__group task__form-group--subtasks">
        <p className="form__group-title">Subtasks</p>
        { subtasks.map(({ id, value }) => (
          <TextField key={ id }
              closable={ true }
              value={ value }
              error={ errors.subtasks.includes(id) }
              onChange={ (event) => handleSubtaskValueChange(event, id) }
              onClick={ () => removeSubtask(id) } />
        )) }
      </div>
      <div className="form__group">
        <Button type="secondary" onClick={ addNewSubtask }>+ Add New Task</Button>
      </div>
      <div className="form__group">
        <p className="form__group-title">Status</p>
        <Dropdown name="status" value={ status } onChange={ handleFormFieldsChange } />
      </div>
      <Button type="primary" disabled={ taskStatus === THUNK_STATUS.LOADING }>
        { editTask && (taskStatus === THUNK_STATUS.LOADING ? "Saving..." : "Save changes") }
        { !editTask && (taskStatus === THUNK_STATUS.LOADING ? "Creating..." : "Create task") }
      </Button>
    </form>
  );
};
