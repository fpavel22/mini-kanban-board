import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  fetchUserBoards,
  allBoardsSelector,
  boardsStatusSelector,
  boardsErrorSelector,
  activeBoardSelector
} from '../../features/boardsSlice';
import { openModal } from '../../features/modalSlice';
import { userSelector } from '../../features/userSlice';
import { MODAL_CONTENT, THUNK_STATUS } from '../../constants';

import iconBoard from '../../assets/icon-board.svg';

export const SidebarNavigation = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);
  const boardsError = useSelector(boardsErrorSelector);
  const activeBoard = useSelector(activeBoardSelector);
  const { uid } = useSelector(userSelector);

  const dispatch = useDispatch();

  const { boardId } = useParams();
  const navigate = useNavigate();

  const boardsCount = boards.length;

  function showBoardForm() {
    dispatch(openModal(MODAL_CONTENT.BOARD_FORM));
  };

  useEffect(() => {
    dispatch(fetchUserBoards(uid));
  }, []);

  useEffect(() => {
    if (activeBoard && !boardId) {
      const { path } = activeBoard;
      navigate(`/boards/${ path }`);
    }
  }, [ activeBoard ]);

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">
        { boardsStatus === THUNK_STATUS.FAILED
          ? boardsError
          : boardsStatus === THUNK_STATUS.LOADING
            ? 'Loading...'
            : `All Boards (${ boardsCount })` }
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
