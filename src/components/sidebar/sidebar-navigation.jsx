import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { allBoardsSelector, boardsStatusSelector, boardsErrorSelector } from '../../features/boardsSlice';
import { openModal } from '../../features/modalSlice';
import { MODAL_CONTENT, THUNK_STATUS } from '../../constants';

import iconBoard from '../../assets/icon-board.svg';

export const SidebarNavigation = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);
  const boardsError = useSelector(boardsErrorSelector);

  const dispatch = useDispatch();
  const { boardId } = useParams();

  function showBoardForm() {
    dispatch(openModal(MODAL_CONTENT.BOARD_FORM));
  };

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">
        { boardsStatus === THUNK_STATUS.FAILED
          ? boardsError
          : boardsStatus === THUNK_STATUS.LOADING
            ? 'Loading...'
            : `All Boards (${ boards.length })` }
      </p>
      <ul className="sidebar__navigation-items">
        { boardsStatus !== THUNK_STATUS.LOADING && boards.map(({ path, pageName }) => (
          <li key={ path } className={ path === boardId ? 'active' : null }>
            <Link to={ `/boards/${ path }` }>
              <img src={ iconBoard } alt="Board icon" />
              <span>{ pageName }</span>
            </Link>
          </li>
        )) }
        <li className="sidebar__create" onClick={ showBoardForm }>
          <img src={ iconBoard } alt="Icon board" />
          <span>+ Create new Board</span>
        </li>
      </ul>
    </div>
  );
};
