import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { Navbar as PageNavbar } from '@components';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { allTasksSelector, tasksStatusSelector } from '@/features/tasksSlice';
import { themeSliceSelector, enableLightTheme } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { auth } from '@/firebase/config';
import { useSidebarVisibleContext } from '@/hooks';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';

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

  const popupMenuOptions = [
    {
      value: 'important',
      label: `Logged in as ${ user.email }`
    },
    {
      value: 'danger',
      label: 'Sign out',
      onClick() {
        signOut(auth);
        dispatch(enableLightTheme());
      }
    }
  ];

  const navbarTitle = {
    [ THUNK_STATUS.LOADING ]: 'Loading...',
    [ THUNK_STATUS.SUCCEEDED ]: boards.find(({ id }) => id === boardId)?.pageName
  };

  const navbarProps = {
    darkMode,
    navbarTitle: navbarTitle[ boardsStatus ],
    sidebarVisible
  };

  const navbarBtnProps = {
    showBtn: tasksFetched && tasks.length > 0,
    menuOptions: popupMenuOptions,
    btnTitle: 'Add New Task',
    onButtonClick() {
      dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
    }
  };

  const props = { ...navbarProps, ...navbarBtnProps };

  return <PageNavbar { ...props } />;
};
