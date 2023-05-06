import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { openModal } from '../../features/modalSlice';
import { selectTask } from '../../features/tasksSlice';
import { themeSliceSelector } from '../../features/themeSlice';
import { MODAL_CONTENT } from '../../constants';

export const Card = ({ task, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

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
    <div { ...props } className={ _className } onClick={ showTaskDetails }>
      <div className="card__header">
        <h4>{ title }</h4>
        <span />
      </div>
      <p className="card__summary">
        { subtasksCount
          ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
          : 'No subtasks added' }
      </p>
    </div>
  );
};
