import { useSelector } from 'react-redux';
import cn from 'classnames';

// import { closeModal } from '@/features/modalSlice';
// import { KEYCODES } from '@/constants';
import { themeSliceSelector } from '@/features/themeSlice';

import iconClose from '@/assets/icon-cross.svg';

export const TextField = ({
  multiline,
  type = 'text',
  closable,
  error,
  className,
  onKeyDown,
  onIconCloseClick,
  ...props
}) => {
  // const dispatch = useDispatch();
  // function handleKeyDown(event) {
  //   const { keyCode } = event;

  //   if (keyCode === KEYCODES.ESCAPE) {
  //     dispatch(closeModal());
  //   }

  //   onKeyDown?.(event);
  // }

  // const props = {
  //   ...props,
  //   onKeyDown: handleKeyDown
  // };
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('text-field', {
    'text-field--multiline': multiline,
    'text-field--error': error,
    'text-field--d-mode': darkMode
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
          className="text-field--close"
          src={ iconClose }
          alt="Close icon"
          onClick={ onIconCloseClick }
        />
      ) }
    </div>
  );
};
