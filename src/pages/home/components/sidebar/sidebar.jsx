import { useSelector, useDispatch } from 'react-redux';

import { Sidebar as GenericSidebar } from '@components';
import { allBoardsSelector, boardsStatusSelector, boardsErrorSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { themeSliceSelector, enableDarkTheme, enableLightTheme } from '@/features/themeSlice';
import { useSidebarContext } from '@/hooks';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';

export const Sidebar = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);
  const boardsError = useSelector(boardsErrorSelector);

  const darkMode = useSelector(themeSliceSelector);

  const { sidebarVisible, setSidebarVisible } = useSidebarContext();

  const dispatch = useDispatch();

  const navigationTitle = {
    [ THUNK_STATUS.FAILED ]: boardsError,
    [ THUNK_STATUS.LOADING ]: 'Loading...',
    [ THUNK_STATUS.SUCCEEDED ]: `All Boards (${ boards.length })`
  };

  function showSidebar() {
    setSidebarVisible(true);
  }

  const sidebarProps = {
    darkMode,
    sidebarVisible,
    showSidebar
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
      setSidebarVisible(false);
    },
    toggleTheme() {
      dispatch(darkMode ? enableLightTheme() : enableDarkTheme());
    }
  };

  const props = {
    ...sidebarProps,
    ...sidebarNavigationProps,
    ...sidebarToggleProps
  };

  return <GenericSidebar { ...props } />;
};
