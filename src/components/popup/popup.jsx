import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import './popup.scss';

export const Popup = forwardRef(({ options, ...props }, ref) => {
  const darkMode = useSelector(themeSliceSelector);

  const _options = options ?? [];
  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  });

  const renderPopupItems = (
    <>
      { _options.map(({ value, label, onClick }) => {
        const _className = cn('popup__item', {
          'popup__item--delete': value === 'delete'
        });

        return (
          <li key={ value } className={ _className } onClick={ onClick }>{ label }</li>
        );
      }) }
    </>
  );

  return (
    <>
      { createPortal(
        <ul { ...props } className={ _className } ref={ ref }>
          { renderPopupItems }
        </ul>,
      document.body
      ) }
    </>
  );
});
