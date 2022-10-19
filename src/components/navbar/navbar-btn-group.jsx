import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

import { Button } from "../button";
import { Popup } from '../popup';
import { enableLightTheme } from "../../features/themeSlice";
import { toggleTaskForm } from "../../features/showModalSlice";
import { tasksSelector } from "../../features/tasksSlice";
import { userSelector } from "../../features/userSlice";
import { auth } from '../../firebase/auth';
import { usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, POPPER_PLACEMENTS } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const NavbarBtnGroup = () => {
  const [ showMenu, setShowMenu ] = useState(false);
  const { tasksList } = useSelector(tasksSelector);
  const user = useSelector(userSelector);

  const {
    popperStyles,
    setParentRef,
    setReferenceRef
  } = usePositionPopup(POPPER_MODIFIERS, POPPER_PLACEMENTS.bottomRight);

  const dispatch = useDispatch();

  const popupOptions = [
    { value: 'important', label: `Logged in as ${ user.email }` },
    { value: 'danger', label: 'Sign out', onClick: handleSignout }
  ];

  function handleAddTask() {
    dispatch(toggleTaskForm({ addNewTask: true, editTask: false }));
  }

  function showOptionsMenu() {
    setShowMenu((prevState) => !prevState);
  }

  function handleSignout() {
    signOut(auth);
    dispatch(enableLightTheme());
  }

  return (
    <div className="header__btn-group">
      { tasksList.length > 0 && (
        <Button type="primary"
            size="lg"
            onClick={ handleAddTask }>
          + Add New Task
        </Button>
      ) }
      <img src={ iconEllipsis }
          className="header__btn--options"
          alt="Options icon"
          ref={ setParentRef }
          onClick={ showOptionsMenu } />
      { showMenu && <Popup options={ popupOptions } style={ popperStyles } ref={ setReferenceRef } /> }
    </div>
  )
};
