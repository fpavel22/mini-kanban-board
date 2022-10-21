import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';

export const SubtaskItem = ({ completed, loading, children, onChange }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('subtask__item', {
    'subtask__item--d-mode': darkMode,
    'subtask__item--completed': completed,
    'subtask__item--loading': loading,
  });

  return (
    <label className={ _className }>
      <input type="checkbox"
          checked={ completed }
          disabled={ loading }
          onChange={ onChange } />
      <span className="subtask__title">{ children }</span>
    </label>
  );
};
