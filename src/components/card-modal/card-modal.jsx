import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { hideModal } from '../../features/showAddTaskModalSlice';
import './card-modal.scss';

export const CardModal = ({ children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const _className = cn('card__modal', {
    'card__modal--d-mode': darkMode
  });

  function hideCardModal({ target: { className } }) {
    const classNameList = className.split(' ');

    if (classNameList.includes('card__modal')) {
      dispatch(hideModal());
    }
  }

  return (
    <div { ...props } className={ _className } onClick={ hideCardModal }>
      <div className="card__modal-content">
        { children }
      </div>
    </div>
  );
}