import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

import { Button } from "../button";
import { Popup } from '../popup';
import { resetBoards } from '../../features/boardsSlice';
import { toggleTaskForm } from "../../features/modalSlice";
import { tasksSliceSelectors } from "../../features/tasksSlice";
import { enableLightTheme } from "../../features/themeSlice";
import { userSelector } from "../../features/userSlice";
import { auth } from '../../firebase/auth';
import { usePositionPopup } from '../../hooks';
import { POPPER_MODIFIERS, POPPER_PLACEMENTS } from '../../constants';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

export const NavbarBtnGroup = () => {
  const { tasksSelector } = tasksSliceSelectors;

  const [ showMenu, setShowMenu ] = useState(false);

  const tasks = useSelector(tasksSelector);
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
    dispatch(resetBoards());
  }

  return (
    <div className="header__btn-group">
      { tasks.length > 0 && (
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
