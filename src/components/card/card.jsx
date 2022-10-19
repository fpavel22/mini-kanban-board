import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { toggleTaskView } from '../../features/showModalSlice';
import { selectTask } from '../../features/tasksSlice';

export const Card = ({ task, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const { title, subtasks } = task;
  const subtasksCount = subtasks.length;
  const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

  const _className = cn('card', {
    'card--d-mode': darkMode
  });

  function showTaskDetails() {
    dispatch(selectTask(task));
    dispatch(toggleTaskView(true));
  }

  return (
    <div { ...props } className={ _className } onClick={ showTaskDetails }>
      <h4 className="card__header">{ title }</h4>
      <p className="card__summary">
        { subtasksCount
          ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
          : 'No subtasks added'
        }
      </p>
    </div>
  );
};
