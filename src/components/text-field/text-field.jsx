import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { closeModal } from '../../features/modalSlice';
import { themeSliceSelector } from '../../features/themeSlice';
import { KEYCODES } from '../../constants';

import iconClose from '../../assets/icon-cross.svg';

export const TextField = ({
  multiline,
  type,
  closable,
  error,
  className,
  onKeyDown,
  onClick,
  ...props
}) => {
  const darkMode = useSelector(themeSliceSelector);

  const dispatch = useDispatch();

  const _className = cn('text-field', {
    'text-field--multiline': multiline,
    'text-field--error': error,
    'text-field--d-mode': darkMode
  }, className);

  function handleKeyDown(event) {
    const { keyCode } = event;

    if (keyCode === KEYCODES.ESCAPE) {
      dispatch(closeModal());
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  const _type = type ?? 'text';

  const fieldProps = {
    ...props,
    onKeyDown: handleKeyDown
  };

  const field = multiline
    ? <textarea { ...fieldProps } />
    : <input { ...fieldProps } type={ _type } />;

  return (
    <div className="text-field__control">
      <label className={ _className }>
        { field }
        { error && <span className="text-field--feedback">Can't be empty</span> }
      </label>
      { closable && <img className="text-field--close" src={ iconClose } alt="Close icon" onClick={ onClick } /> }
    </div>
  );
};
