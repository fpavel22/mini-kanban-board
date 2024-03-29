import { useSelector, useDispatch } from 'react-redux';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import { openModal } from '@/features/modalSlice';
import { selectTask } from '@/features/tasksSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { MODAL_CONTENT } from '@/constants';

export const Card = ({ task, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: task.id
  });

  const dispatch = useDispatch();

  const style = { transform: CSS.Translate.toString(transform) };

  const { title, subtasks, priority } = task;
  const subtasksCount = subtasks.length;
  const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

  const _className = cn('card', {
    'card--d-mode': darkMode,
    [`card--priority-${ priority }`]: priority
  });

  function showTaskDetails() {
    dispatch(selectTask(task));
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }

  return (
    <div
      { ...props }
      { ...attributes }
      { ...listeners }
      style={ style }
      className={ _className }
      onClick={ showTaskDetails }
      ref={ setNodeRef }
    >
      <h4 className="card__header">{ title }</h4>
      <p className="card__summary">
        { subtasksCount
          ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
          : 'No subtasks added' }
      </p>
    </div>
  );
};
