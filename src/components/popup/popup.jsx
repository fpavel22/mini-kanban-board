import cn from 'classnames';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

import './popup.scss';

const POPUP_STATES = {
  DANGER: 'danger',
  IMPORTANT: 'important'
};

const PopupItem = ({
  disabled,
  label,
  value,
  ...props
}) => {
  const _className = cn('popup__item', {
    'popup__item--disabled': disabled,
    'popup__item--danger': value === POPUP_STATES.DANGER,
    'popup__item--important': value === POPUP_STATES.IMPORTANT
  });

  return <li { ...props } className={ _className }>{ label }</li>;
};

export const Popup = forwardRef(({
  className,
  darkMode,
  items = [],
  portal = true,
  portalTarget = document.body,
  ...props
}, ref) => {
  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  }, className);

  const popupBody = (
    <ul { ...props } className={ _className } ref={ ref }>
      { items.map(({
        disabled,
        label,
        onPopupItemClick,
        value
      }) => (
        <PopupItem
          disabled={ disabled }
          key={ value }
          label={ label }
          onClick={ onPopupItemClick }
          value={ value }
        />
      )) }
    </ul>
  );

  return portal ? createPortal(popupBody, portalTarget) : popupBody;
});
