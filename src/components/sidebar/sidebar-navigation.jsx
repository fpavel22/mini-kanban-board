import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { fetchUserBoards, boardsSliceSelectors } from '../../features/boardsSlice';
import { toggleBoardForm } from '../../features/modalSlice';
import { userSelector } from '../../features/userSlice';
import { useGetDocuments } from '../../hooks';
import { FIREBASE_COLLECTIONS, THUNK_STATUS } from '../../constants';

import iconBoard from '../../assets/icon-board.svg';

export const SidebarNavigation = () => {
  const { boardsSelector, activeBoardSelector, statusSelector, errorSelector } = boardsSliceSelectors;

  const boards = useSelector(boardsSelector);
  const activeBoard = useSelector(activeBoardSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);

  const { uid } = useSelector(userSelector);

  const dispatch = useDispatch();
  const { boardId } = useParams();
  const navigate = useNavigate();
  
  const { getCollectionDocs } = useGetDocuments(FIREBASE_COLLECTIONS.BOARDS);

  const boardsCount = boards.length;

  async function showBoardForm() {
    dispatch(toggleBoardForm(true));
  };

  useEffect(() => {
    const thunkArgs = {
      getCollectionDocs,
      uid
    };

    dispatch(fetchUserBoards(thunkArgs));
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
        { status === THUNK_STATUS.LOADING ? 'Loading...' : `All Boards (${ boardsCount })` }
        { error && 'Could not load the boards.' }
      </p>
      <ul className="sidebar__navigation-items">
        { status !== THUNK_STATUS.LOADING && boards.map(({ path, pageName }) => (
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
