import cn from 'classnames';
import { useSelector } from 'react-redux';

import { themeSliceSelector } from '../../features/themeSlice';
import './text-field.scss';

export const TextField = ({ error, className, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('text-field', {
    'text-field--error': error,
    'text-field--d-mode': darkMode
  }, className);

  return (
    <label className={ _className }>
      <input { ...props } type="text" />
      { error && <span className="text-field--feedback">Can't be empty</span> }
    </label>
  );
}