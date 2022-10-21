import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { TextField } from '../text-field';
import { toggleTaskForm, toggleTaskView } from '../../features/showModalSlice';
import { addTask, updateTask, tasksSelector } from '../../features/tasksSlice';
import { useSetDocument } from '../../hooks';
import { FIREBASE_COLLECTIONS } from '../../constants';

const TEXTAREA_PLACEHOLDER = "e.g. It's always good to take a break. This 15 minutes break will recharge the batteries.";

export const TaskForm = ({ editTask }) => {
  const { selectedTask } = useSelector(tasksSelector);

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
  const { loading, setDocument } = useSetDocument(FIREBASE_COLLECTIONS.TASKS);
  
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
      const id = editTask ? selectedTask.id : uuidv4();

      const task = {
        id,
        pageId: boardId,
        title,
        description,
        subtasks,
        status
      };

      await setDocument(id, task);
      dispatch(editTask ? updateTask(task) : addTask(task));
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
    <form className="task__form" onSubmit={ handleFormSubmit }>
      { editTask &&
        <span className="task__form--go-back" onClick={ handleGoBack }>&#x2190; Go back</span> }
      <h2 className="task__form-title">{ editTask ? "Edit" : "Add New" } Task</h2>
      <div className="task__form-group">
        <div className="task__form-group--title">Title</div>
        <TextField placeholder="e.g. Make coffee"
            name="title"
            value={ title }
            error={ errors.title }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Description</div>
        <TextField multiline={ true }
            placeholder={ TEXTAREA_PLACEHOLDER }
            name="description"
            value={ description }
            error={ errors.description }
            onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group task__form-group--subtasks">
        <div className="task__form-group--title">Subtasks</div>
        { subtasks.map(({ id, value }) => (
          <TextField key={ id }
              closable={ true }
              value={ value }
              error={ errors.subtasks.includes(id) }
              onChange={ (event) => handleSubtaskValueChange(event, id) }
              onClick={ () => removeSubtask(id) } />
        )) }
      </div>
      <div className="task__form-group">
        <Button type="secondary" onClick={ addNewSubtask }>+ Add New Task</Button>
      </div>
      <div className="task__form-group">
        <div className="task__form-group--title">Status</div>
        <Dropdown name="status" value={ status } onChange={ handleFormFieldsChange } />
      </div>
      <div className="task__form-group">
        <Button type="primary" disabled={ loading }>
          { editTask ? "Save changes" : "Create task" }
        </Button>
      </div>
    </form>
  );
};
