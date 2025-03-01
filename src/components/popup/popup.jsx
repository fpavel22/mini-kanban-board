import cn from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { mergeRefs } from 'react-merge-refs';

import { POPPER_DEFAULT_MODIFIERS, POPPER_PLACEMENTS } from '@/constants';
import { useHandleClickOutside, usePositionPopup } from '@/hooks';

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

export const Popup = ({
  className,
  darkMode,
  items = [],
  portal = true,
  portalTarget = document.body,
  trigger,
  ...props
}) => {
  const [ showPopup, setShowPopup ] = useState(false);

  const hidePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const { popupRef, triggerRef } = useHandleClickOutside(showPopup, hidePopup);

  const {
    popperStyles,
    setParentRef,
    setReferenceRef
  } = usePositionPopup(POPPER_DEFAULT_MODIFIERS, POPPER_PLACEMENTS.bottomRight);

  const _className = cn('popup__body', {
    'popup__body--d-mode': darkMode
  }, className);

  const popupCombinedRefs = useMemo(
    () => mergeRefs([ popupRef, setReferenceRef ]),
    [ popupRef, setReferenceRef ]
  );
  const triggerCombinedRefs = useMemo(
    () => mergeRefs([ setParentRef, triggerRef ]),
    [ setParentRef, triggerRef ]
  );

  const togglePopup = useCallback(() => {
    setShowPopup((prevState) => !prevState);
  }, []);

  const popupBody = showPopup && (
    <ul
      { ...props }
      className={ _className }
      ref={ popupCombinedRefs }
      style={ popperStyles }
    >
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

  return (
    <>
      { trigger?.({ ref: triggerCombinedRefs, onClick: togglePopup }) }
      { portal ? createPortal(popupBody, portalTarget) : popupBody }
    </>
  );
};
