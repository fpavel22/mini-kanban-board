import { useSelector, useDispatch } from 'react-redux';

import { SidebarNavigationItem } from '@components/sidebar/sidebar-navigation-item';
import { allBoardsSelector, boardsStatusSelector, boardsErrorSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import { MODAL_CONTENT, THUNK_STATUS } from '@/constants';

import iconBoard from '@/assets/icon-board.svg';

export const SidebarNavigation = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);
  const boardsError = useSelector(boardsErrorSelector);

  const dispatch = useDispatch();

  function showBoardForm() {
    dispatch(openModal(MODAL_CONTENT.BOARD_FORM));
  }

  const renderNavigationTitle = () => {
    switch (boardsStatus) {
      case THUNK_STATUS.FAILED:
        return boardsError;
      case THUNK_STATUS.LOADING:
        return 'Loading...';
      default:
        return `All Boards (${ boards.length })`;
    }
  };

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">
        { renderNavigationTitle() }
      </p>
      <ul className="sidebar__navigation-items">
        { boardsStatus !== THUNK_STATUS.LOADING && boards.map(({ path, pageName }) => (
          <SidebarNavigationItem
            key={ path }
            path={ path }
            pageName={ pageName }
          />
        )) }
      </ul>
      <div className="sidebar__create" onClick={ showBoardForm }>
        <img src={ iconBoard } alt="Icon board" />
        <span>+ Create new Board</span>
      </div>
    </div>
  );
};
