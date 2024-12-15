import { useState, useCallback, useMemo } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useHandleClickOutside, usePositionPopup } from '@/hooks';
import { POPPER_DEFAULT_MODIFIERS, POPPER_PLACEMENTS } from '@/constants';
import { Button } from '../button';
import { EllipsisIcon } from '../ellipsis-icon';
import { Popup } from '../popup';

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
  } = usePositionPopup(POPPER_DEFAULT_MODIFIERS, POPPER_PLACEMENTS.bottomRight);

  const hidePopup = useCallback(() => {
    setShowMenu(false);
  }, []);

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
        alt="Navbar options icon"
        ref={ ellipsisRefs }
        onClick={ toggleOptionsMenu }
      />
      { showMenu
        && (
          <Popup
            darkMode={ darkMode }
            items={ menuOptions }
            style={ popperStyles }
            ref={ mergeRefs([ popupRef, setReferenceRef ]) }
          />
        )}
    </div>
  );
};
