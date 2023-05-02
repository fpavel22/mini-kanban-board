import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mergeRefs } from 'react-merge-refs';
import { signOut } from 'firebase/auth';

import { Button } from '../button';
import { Popup } from '../popup';
import { openModal } from '../../features/modalSlice';
import { allTasksSelector } from '../../features/tasksSlice';
import { enableLightTheme } from '../../features/themeSlice';
import { userSelector } from '../../features/userSlice';
import { auth } from '../../firebase/auth';
import { useHandleClickOutside, usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, POPPER_PLACEMENTS, MODAL_CONTENT } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const NavbarBtnGroup = () => {
  const [ showMenu, setShowMenu ] = useState(false);

  const tasks = useSelector(allTasksSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const {
    popperStyles,
    setParentRef,
    setReferenceRef
  } = usePositionPopup(POPPER_MODIFIERS, POPPER_PLACEMENTS.bottomRight);

  function hidePopup() {
    setShowMenu(false);
  }

  const { parentRef, popupRef } = useHandleClickOutside(showMenu, hidePopup);

  function handleAddTask() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  }

  function showOptionsMenu() {
    setShowMenu((prevState) => !prevState);
  }

  function handleSignout() {
    signOut(auth);
    dispatch(enableLightTheme());
  }

  const popupOptions = [
    { value: 'important', label: `Logged in as ${ user.email }` },
    { value: 'danger', label: 'Sign out', onClick: handleSignout }
  ];

  return (
    <div className="header__btn-group">
      { tasks.length > 0 && (
        <Button
          variety="primary"
          onClick={ handleAddTask }
        >
          +
          <span className="btn__title">Add New Task</span>
        </Button>
      ) }
      <img
        src={ iconEllipsis }
        className="header__btn--options"
        alt="Options icon"
        ref={ mergeRefs([ parentRef, setParentRef ]) }
        onClick={ showOptionsMenu }
      />
      { showMenu
        && (
          <Popup
            options={ popupOptions }
            style={ popperStyles }
            ref={ mergeRefs([ popupRef, setReferenceRef ]) }
          />
        )}
    </div>
  );
};
