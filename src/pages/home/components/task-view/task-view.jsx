import { useState, useCallback, useMemo } from 'react';
import { mergeRefs } from 'react-merge-refs';

import {
  Dropdown,
  EllipsisIcon,
  Popup,
  SubtaskItem
} from '@components/ui';
import { useHandleClickOutside, usePositionPopup } from '@/hooks';
import { POPPER_MODIFIERS, THUNK_STATUS } from '@/constants';

export const TaskView = ({
  darkMode,
  selectedTask = {},
  showEditDialog = () => {},
  showDeleteDialog = () => {},
  updateSubtaskStatus = async () => {}
}) => {
  const [ popupVisible, setPopupVisible ] = useState(false);
  const [ localState, setLocalState ] = useState(THUNK_STATUS.IDLE);

  const { popperStyles, setParentRef, setReferenceRef } = usePositionPopup(POPPER_MODIFIERS);

  const subtasksCompleted = selectedTask.subtasks?.filter(({ completed }) => completed).length;
  const subtasksTotal = selectedTask.subtasks?.length;

  function hidePopup() {
    setPopupVisible(false);
  }

  const { parentRef, popupRef } = useHandleClickOutside(popupVisible, hidePopup);

  const subtasksTitle = `Subtasks (${ subtasksCompleted } out of ${ subtasksTotal })`;

  const popupOptions = [
    { value: 'edit', label: 'Edit task', onClick: showEditDialog },
    { value: 'danger', label: 'Delete task', onClick: showDeleteDialog }
  ];

  function handleSubtaskStatus(id) {
    return async (event) => {
      try {
        setLocalState(THUNK_STATUS.LOADING);

        await updateSubtaskStatus(event, id);

        setLocalState(THUNK_STATUS.IDLE);
      } catch (err) {
        setLocalState(THUNK_STATUS.FAILED);
      }
    };
  }

  const togglePopup = useCallback(() => {
    setPopupVisible((prevState) => !prevState);
  }, []);

  const ellipsisRefs = useMemo(() => mergeRefs([ parentRef, setParentRef ]), []);

  const renderSubtasksList = selectedTask?.subtasks.map(({ id, value, completed }) => (
    <SubtaskItem
      key={ id }
      completed={ completed }
      loading={ localState === THUNK_STATUS.LOADING }
      darkMode={ darkMode }
      title={ value }
      onChange={ handleSubtaskStatus(id) }
    >
      { value }
    </SubtaskItem>
  ));

  return (
    <div className="form task__view">
      <div className="task__view-header">
        <h2 className="form__title">
          { selectedTask?.title }
        </h2>
        <EllipsisIcon
          className="task__view-options"
          alt="Task view options icon"
          ref={ ellipsisRefs }
          onClick={ togglePopup }
        />
      </div>
      <p className="task__view-description">
        { selectedTask?.description }
      </p>
      <div className="task__view-subtasks">
        <h5 className="task__view-label">
          { subtasksTitle }
        </h5>
        <div className="subtasks__list">
          { renderSubtasksList }
        </div>
      </div>
      <div className="task__view-status">
        <h5 className="task__view-label">Current status</h5>
        <Dropdown darkMode={ darkMode } value={ selectedTask.priority } disabled={ true } />
      </div>
      { popupVisible && (
        <Popup
          options={ popupOptions }
          style={ popperStyles }
          ref={ mergeRefs([ popupRef, setReferenceRef ]) }
        />
      ) }
    </div>
  );
};
