import { useCallback, useMemo, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { POPPER_DEFAULT_MODIFIERS, POPPER_PLACEMENTS } from '@/constants';
import { useHandleClickOutside, usePositionPopup } from '@/hooks';

import { Button } from '../../button';
import { EllipsisIcon } from '../../ellipsis-icon';
import { Popup } from '../../popup';

export const NavbarBtnGroup = ({
  btnTitle,
  darkMode,
  menuOptions,
  onButtonClick,
  showBtn
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
          darkMode={ darkMode }
          onClick={ onButtonClick }
          variety="primary"
        >
          +
          <span className="btn__title">{ btnTitle }</span>
        </Button>
      ) }
      <EllipsisIcon
        alt="Navbar options icon"
        className="header__btn--options"
        onClick={ toggleOptionsMenu }
        ref={ ellipsisRefs }
      />
      { showMenu
        && (
          <Popup
            darkMode={ darkMode }
            items={ menuOptions }
            ref={ mergeRefs([ popupRef, setReferenceRef ]) }
            style={ popperStyles }
          />
        )}
    </div>
  );
};
