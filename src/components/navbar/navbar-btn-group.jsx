import { useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { Button, Popup } from '@components/ui';
import { useHandleClickOutside, usePositionPopup } from '@/hooks';
import { POPPER_MODIFIERS, POPPER_PLACEMENTS } from '@/constants';

import iconEllipsis from '@/assets/icon-vertical-ellipsis.svg';

export const NavbarBtnGroup = ({
  darkMode,
  showBtn,
  btnTitle,
  menuOptions,
  onButtonClick = () => {}
}) => {
  const [ showMenu, setShowMenu ] = useState(false);

  const {
    popperStyles,
    setParentRef,
    setReferenceRef
  } = usePositionPopup(POPPER_MODIFIERS, POPPER_PLACEMENTS.bottomRight);

  function hidePopup() {
    setShowMenu(false);
  }

  const { parentRef, popupRef } = useHandleClickOutside(showMenu, hidePopup);

  function toggleOptionsMenu() {
    setShowMenu((prevState) => !prevState);
  }

  return (
    <div className="header__btn-group">
      { showBtn && (
        <Button
          variety="primary"
          darkMode={ darkMode }
          onClick={ onButtonClick }
        >
          +
          <span className="btn__title">{ btnTitle }</span>
        </Button>
      ) }
      <img
        src={ iconEllipsis }
        className="header__btn--options"
        alt="Options icon"
        ref={ mergeRefs([ parentRef, setParentRef ]) }
        onClick={ toggleOptionsMenu }
      />
      { showMenu
        && (
          <Popup
            darkMode={ darkMode }
            options={ menuOptions }
            style={ popperStyles }
            ref={ mergeRefs([ popupRef, setReferenceRef ]) }
          />
        )}
    </div>
  );
};
