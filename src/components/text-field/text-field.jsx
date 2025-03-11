import cn from 'classnames';

import iconClose from '@/assets/icon-cross.svg';

import './text-field.scss';

export const TextField = ({
  className,
  closable,
  darkMode,
  error,
  multiline,
  onKeyDown,
  onIconCloseClick,
  type = 'text',
  ...props
}) => {
  const _className = cn('text-field', {
    'text-field--d-mode': darkMode,
    'text-field--error': error,
    'text-field--multiline': multiline
  }, className);

  const field = multiline
    ? <textarea { ...props } />
    : <input { ...props } type={ type } />;

  return (
    <div className="text-field__control">
      <label className={ _className }>
        { field }
        { error && <span className="text-field--feedback">Can't be empty</span> }
      </label>
      { closable && (
        <img
          alt="Close icon"
          className="text-field--close"
          onClick={ onIconCloseClick }
          src={ iconClose }
        />
      ) }
    </div>
  );
};
