import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { PopupItem } from './popup-item';

export const Popup = forwardRef(({
  darkMode,
  portal = true,
  options = [],
  className,
  ...props
}, ref) => {
  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  }, className);

  const popupBody = (
    <ul { ...props } className={ _className } ref={ ref }>
      { options.map((option) => (
        <PopupItem key={ option.value } option={ option } />
      )) }
    </ul>
  );

  return portal ? createPortal(popupBody, document.body) : popupBody;
});
