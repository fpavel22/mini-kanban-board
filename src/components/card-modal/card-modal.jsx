import cn from 'classnames';
import { useSelector } from 'react-redux';
import { themeSliceSelector } from '../../features/themeSlice';
import './card-modal.scss';

export const CardModal = ({ children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const _className = cn('card__modal', {
    'card__modal--d-mode': darkMode
  });

  return (
    <div { ...props } className={ _className }>
      <div className="card__modal-content">
        { children }
      </div>
    </div>
  );
}