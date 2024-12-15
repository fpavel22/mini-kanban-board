import { useRef } from 'react';
import cn from 'classnames';

export const ModalOverlay = ({
  darkMode,
  className,
  onClickOutside,
  children,
  ...props
}) => {
  const modalRef = useRef();

  const _className = cn('modal', {
    'modal--d-mode': darkMode
  }, className);

  function handleClick({ target }) {
    if (target.contains(modalRef?.current)) {
      onClickOutside?.();
    }
  }

  return (
    <div
      { ...props }
      className={ _className }
      ref={ modalRef }
      onClick={ handleClick }
    >
      <div className="modal-content">
        { children }
      </div>
    </div>
  );
};
