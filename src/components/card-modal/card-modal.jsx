import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { hideAllContent } from '../../features/showModalSlice';
import './card-modal.scss';

export const CardModal = ({ children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const _className = cn('card__modal', {
    'card__modal--d-mode': darkMode
  });

  function handleClickOutside({ target: { className } }) {
    const classNameList = className.split(' ');

    if (classNameList.includes('card__modal')) {
      dispatch(hideAllContent());
    }
  }

  return (
    <div { ...props } className={ _className } onClick={ handleClickOutside }>
      <div className="card__modal-content">
        { children }
      </div>
    </div>
  );
};
