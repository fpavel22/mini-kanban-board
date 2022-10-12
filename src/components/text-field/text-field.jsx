import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';

import iconClose from '../../assets/icon-cross.svg';
import './text-field.scss';

export const TextField = ({ multiline, error, closable, className, onClick, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('text-field', {
    'text-field--error': error,
    'text-field--d-mode': darkMode
  }, className);

  const field = multiline
    ? <textarea { ...props } />
    : <input { ...props } type="text" />;

  return (
    <div className="text-field__control">
      <label className={ _className }>
        { field }
        { error && <span className="text-field--feedback">Can't be empty</span> }
      </label>
      { closable && <img className="text-field--close" src={ iconClose } alt="Close icon" onClick={ onClick } />}
    </div>
  );
}