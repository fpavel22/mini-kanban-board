import { useRef } from 'react';
import cn from 'classnames';

export const ModalOverlay = ({
  darkMode,
  className,
  closeModal = () => {},
  children,
  ...props
}) => {
  const modalRef = useRef();

  const _className = cn('card__modal', {
    'card__modal--d-mode': darkMode
  }, className);

  function handleClickOutside({ target }) {
    if (target.contains(modalRef?.current)) {
      closeModal();
    }
  }

  return (
    <div
      { ...props }
      className={ _className }
      ref={ modalRef }
      onMouseDown={ handleClickOutside }
    >
      <div className="card__modal-content">
        { children }
      </div>
    </div>
  );
};
