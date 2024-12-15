import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

const POPUP_STATES = {
  DANGER: 'danger',
  IMPORTANT: 'important'
};

const PopupItem = ({ value, label, ...props }) => {
  const _className = cn('popup__item', {
    'popup__item--danger': value === POPUP_STATES.DANGER,
    'popup__item--important': value === POPUP_STATES.IMPORTANT
  });

  return <li { ...props } className={ _className }>{ label }</li>;
};

export const Popup = forwardRef(({
  darkMode,
  portal = true,
  portalTarget = document.body,
  items = [],
  className,
  ...props
}, ref) => {
  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  }, className);

  const popupBody = (
    <ul { ...props } className={ _className } ref={ ref }>
      { items.map(({ value, label, onPopupItemClick }) => (
        <PopupItem
          key={ value }
          value={ value }
          label={ label }
          onClick={ onPopupItemClick }
        />
      )) }
    </ul>
  );

  return portal ? createPortal(popupBody, portalTarget) : popupBody;
});
