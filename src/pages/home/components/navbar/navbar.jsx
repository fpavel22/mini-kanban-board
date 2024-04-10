import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { Navbar as GenericNavbar } from '@components';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { allTasksSelector } from '@/features/tasksSlice';
import { themeSliceSelector, enableLightTheme } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { auth } from '@/firebase/auth';
import { useSidebarContext } from '@/hooks';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';

export const Navbar = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const tasks = useSelector(allTasksSelector);

  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const { boardId } = useParams();
  const { sidebarVisible } = useSidebarContext();

  const dispatch = useDispatch();

  const showNavbarBtn = tasks.length > 0;
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
    showBtn: showNavbarBtn,
    menuOptions: popupMenuOptions,
    btnTitle: 'Add New Task',
    onButtonClick() {
      dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
    }
  };

  const props = { ...navbarProps, ...navbarBtnProps };

  return <GenericNavbar { ...props } />;
};
