import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PATHS } from '@/constants';
import { fetchUserBoards, resetUserBoards } from '@/features/boardsSlice';
import { userSelector } from '@/features/userSlice';
import { useDispatchUnwrapper } from '@/hooks';

import { BoardContent } from './home/board-content';
import { Modal } from './home/modal';
import { Navbar } from './home/navbar';
import { Sidebar } from './home/sidebar';

export const Home = () => {
  const dispatch = useDispatch();
  const unwrapDispatch = useDispatchUnwrapper();
  const user = useSelector(userSelector);

  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    async function getUserBoards() {
      const userBoards = await unwrapDispatch(fetchUserBoards(user.uid));

      if (userBoards.length > 0) {
        const [ userBoard ] = userBoards;
        let activeBoard = boardId && userBoards.find(({ path }) => path === boardId);

        if (!activeBoard) {
          activeBoard = userBoard;
        }

        navigate(`${ PATHS.BOARDS }/${ activeBoard.path }`);
      }
    }

    getUserBoards();

    return () => {
      dispatch(resetUserBoards());
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="app__content-wrapper">
        <Sidebar />
        <BoardContent key={ boardId } />
        <Modal />
      </div>
    </>
  );
};
