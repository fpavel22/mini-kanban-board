import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { POPUP_STATES } from '../../constants';

export const Popup = forwardRef(({ options, ...props }, ref) => {
  const darkMode = useSelector(themeSliceSelector);

  const _options = options ?? [];
  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  });

  return (
    <>
      { createPortal(
        <ul { ...props } className={ _className } ref={ ref }>
          { _options.map(({ value, label, onClick }) => {
            const _className = cn('popup__item', {
              'popup__item--danger': value === POPUP_STATES.DANGER,
              'popup__item--important': value === POPUP_STATES.IMPORTANT
            });

            return <li key={ value } className={ _className } onClick={ onClick }>{ label }</li>
          }) }
        </ul>,
      document.body
      ) }
    </>
  );
});
