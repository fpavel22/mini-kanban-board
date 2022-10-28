import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { PopupItem } from './popup-item';
import { themeSliceSelector } from '../../features/themeSlice';

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
          { _options.map((option) => <PopupItem option={ option } />) }
        </ul>,
        document.body
      ) }
    </>
  );
});
