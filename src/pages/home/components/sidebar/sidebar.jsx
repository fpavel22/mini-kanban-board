import { useSelector, useDispatch } from 'react-redux';

import { Sidebar as PageSidebar } from '@components';
import { allBoardsSelector, boardsStatusSelector, boardsErrorSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { themeSliceSelector, enableDarkTheme, enableLightTheme } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { useSidebarVisibleContext, useSidebarToggleContext } from '@/hooks';
import { saveToLocalStorage } from '@/utils/utils';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';

export const Sidebar = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);
  const boardsError = useSelector(boardsErrorSelector);

  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const sidebarVisible = useSidebarVisibleContext();
  const setSidebarVisible = useSidebarToggleContext();

  const dispatch = useDispatch();

  const navigationTitle = {
    [ THUNK_STATUS.FAILED ]: boardsError,
    [ THUNK_STATUS.LOADING ]: 'Loading...',
    [ THUNK_STATUS.SUCCEEDED ]: `All Boards (${ boards.length })`
  };

  function toggleSidebar(showSidebar) {
    setSidebarVisible(showSidebar);
    saveToLocalStorage({ userId: user.uid, sidebarVisible: showSidebar });
  }

  function toggleTheme() {
    dispatch(darkMode ? enableLightTheme() : enableDarkTheme());
    saveToLocalStorage({ userId: user.uid, darkMode: !darkMode });
  }

  const sidebarProps = {
    darkMode,
    sidebarVisible,
    showSidebar() {
      toggleSidebar(true);
    }
  };

  const sidebarNavigationProps = {
    navigationItems: boards,
    navigationTitle: navigationTitle[ boardsStatus ],
    navigationBtnText: 'Create new Board',
    onButtonClick() {
      dispatch(openModal(MODAL_CONTENT.BOARD_FORM));
    }
  };

  const sidebarToggleProps = {
    hideSidebar() {
      toggleSidebar(false);
    },
    toggleTheme
  };

  const props = {
    ...sidebarProps,
    ...sidebarNavigationProps,
    ...sidebarToggleProps
  };

  return <PageSidebar { ...props } />;
};
