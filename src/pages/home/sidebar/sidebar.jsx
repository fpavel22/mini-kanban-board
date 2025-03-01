import { useDispatch, useSelector } from 'react-redux';

import { Sidebar as PageSidebar } from '@/components';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';
import { useSidebarToggleContext, useSidebarVisibleContext } from '@/context';
import { allBoardsSelector, boardsErrorSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { enableDarkTheme, enableLightTheme, themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { saveToLocalStorage } from '@/utils';

export const Sidebar = () => {
  const dispatch = useDispatch();

  const boards = useSelector(allBoardsSelector);
  const boardsError = useSelector(boardsErrorSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const user = useSelector(userSelector);

  const darkMode = useSelector(themeSliceSelector);

  const setSidebarVisible = useSidebarToggleContext();
  const sidebarVisible = useSidebarVisibleContext();

  const navigationTitles = {
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

  return (
    <PageSidebar
      darkMode={ darkMode }
      showSidebar={() => {
        toggleSidebar(true);
      }}
      sidebarNavigationProps={{
        navigationBtnText: 'Create new Board',
        navigationItems: boards,
        navigationTitle: navigationTitles[ boardsStatus ],
        onButtonClick() {
          dispatch(openModal(MODAL_CONTENT.BOARD_FORM));
        }
      }}
      sidebarToggleProps={{
        hideSidebar() {
          toggleSidebar(false);
        },
        toggleTheme
      }}
      sidebarVisible={ sidebarVisible }
    />
  );
};
