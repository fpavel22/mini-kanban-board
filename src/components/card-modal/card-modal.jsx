import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { closeModal } from '../../features/modalSlice';
import { themeSliceSelector } from '../../features/themeSlice';

export const CardModal = ({ children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const modalRef = useRef();

  const _className = cn('card__modal', {
    'card__modal--d-mode': darkMode
  });

  function handleClickOutside({ target }) {
    if (target.contains(modalRef?.current)) {
      dispatch(closeModal());
    }
  }

  return (
    <div { ...props } className={ _className } ref={ modalRef } onClick={ handleClickOutside }>
      <div className="card__modal-content">
        { children }
      </div>
    </div>
  );
};
