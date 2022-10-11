import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import './card.scss';

export const Card = ({ title, tasks, tasksCompleted, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('card', {
    'card--d-mode': darkMode
  });

  return (
    <div { ...props } className={ _className }>
      { title && <h4 className="card__header">{ title }</h4> }
      <span className="card__summary">{ tasksCompleted } of { tasks } subtasks</span>
    </div>
  );
}
