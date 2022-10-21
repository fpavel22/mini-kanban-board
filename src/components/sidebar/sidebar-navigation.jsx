import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { boardsSelector, setUserBoards } from '../../features/boardsSlice';
import { toggleBoardForm } from '../../features/showModalSlice';
import { userSelector } from '../../features/userSlice';
import { useGetDocuments } from '../../hooks';
import { FIREBASE_QUERY, FIREBASE_COLLECTIONS } from '../../constants';

import iconBoard from '../../assets/icon-board.svg';

export const SidebarNavigation = () => {
  const boards = useSelector(boardsSelector);
  const { uid } = useSelector(userSelector);
  const dispatch = useDispatch();

  const { boardId } = useParams();
  const navigate = useNavigate();
  
  const { loading, error, getCollectionDocs } = useGetDocuments(FIREBASE_COLLECTIONS.BOARDS);

  const boardsCount = boards.length;

  async function showBoardForm() {
    dispatch(toggleBoardForm(true));
  };

  useEffect(() => {
    async function getUserBoards() {
      const results = await getCollectionDocs(FIREBASE_QUERY.CREATED_BY, uid);
  
      if (results.length && !boardId) {
        const [ result ] = results;
        const { path } = result;

        navigate(`/boards/${ path }`);
      }
  
      dispatch(setUserBoards(results));
    }

    getUserBoards();
  }, []);

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">
        { loading ? 'Loading...' : `All Boards (${ boardsCount })` }
        { error && 'Could not load the boards.' }
      </p>
      <ul className="sidebar__navigation-items">
        { !loading && boards.map(({ path, pageName }) => (
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
