import cn from 'classnames';
import { useRef } from 'react';

import './modal-overlay.scss';

export const ModalOverlay = ({
  children,
  className,
  darkMode,
  onClickOutside,
  ...props
}) => {
  const modalRef = useRef();

  const _className = cn('modal', {
    'modal--d-mode': darkMode
  }, className);

  function handleClick({ target }) {
    if (target.contains(modalRef.current)) {
      onClickOutside?.();
    }
  }

  return (
    <div
      { ...props }
      className={ _className }
      onClick={ handleClick }
      ref={ modalRef }
    >
      <div className="modal-content">
        { children }
      </div>
    </div>
  );
};
