import { useState, useCallback, useMemo } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { Button, EllipsisIcon, Popup } from '@components/ui';
import { useHandleClickOutside, usePositionPopup } from '@/hooks';
import { POPPER_MODIFIERS, POPPER_PLACEMENTS } from '@/constants';

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

  const ellipsisRefs = useMemo(() => mergeRefs([ parentRef, setParentRef ]), []);

  const toggleOptionsMenu = useCallback(() => {
    setShowMenu((prevState) => !prevState);
  }, []);

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
      <EllipsisIcon
        className="header__btn--options"
        alt="Options icon"
        ref={ ellipsisRefs }
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
