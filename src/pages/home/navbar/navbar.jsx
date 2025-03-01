import { signOut } from 'firebase/auth';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button, Navbar as PageNavbar } from '@/components';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';
import { useSidebarVisibleContext } from '@/context';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { allTasksSelector, tasksStatusSelector } from '@/features/tasksSlice';
import { enableLightTheme, themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { auth } from '@/firebase/config';

export const Navbar = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const tasks = useSelector(allTasksSelector);
  const tasksStatus = useSelector(tasksStatusSelector);

  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const dispatch = useDispatch();

  const { boardId } = useParams();
  const sidebarVisible = useSidebarVisibleContext();

  const tasksFetched = tasksStatus === THUNK_STATUS.SUCCEEDED;

  const popupMenuOptions = useMemo(() => [
    {
      disabled: true,
      label: `Logged in as ${ user.email }`,
      value: 'important',
    },
    {
      label: 'Sign out',
      onPopupItemClick() {
        signOut(auth);
        dispatch(enableLightTheme());
      },
      value: 'danger'
    }
  ], [ dispatch, user.email ]);

  const navbarTitles = {
    [ THUNK_STATUS.LOADING ]: 'Loading...',
    [ THUNK_STATUS.SUCCEEDED ]: boards.find(({ id }) => id === boardId)?.pageName
  };

  function onButtonClick() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  }

  const renderButton = tasksFetched && tasks.length > 0 && (
    <Button
      darkMode={ darkMode }
      onClick={ onButtonClick }
      variety="primary"
    >
      +
      <span className="btn__title">Add New Task</span>
    </Button>
  );

  return (
    <PageNavbar
      darkMode={ darkMode }
      menuOptions={ popupMenuOptions }
      renderButton={ renderButton }
      sidebarVisible={ sidebarVisible }
      title={ navbarTitles[ boardsStatus ] }
    />
  );
};
