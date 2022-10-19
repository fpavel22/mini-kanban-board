import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';

export const SubtaskItem = ({ completed, children, onChange }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('subtask__item', {
    'subtask__item--d-mode': darkMode,
    'subtask__item--completed': completed
  });

  return (
    <label className={ _className }>
      <input type="checkbox" checked={ completed } onChange={ onChange } />
      <span className="subtask__title">{ children }</span>
    </label>
  );
};
