import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import {
  BoardContent,
  ModalWrapper,
  Navbar,
  Sidebar
} from '@/pages/home/components';
import { fetchUserBoards, resetUserBoards } from '@/features/boardsSlice';
import { userSelector } from '@/features/userSlice';
import { PATHS } from '@/constants';

export const Home = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { boardId } = useParams();

  useEffect(() => {
    (async function () {
      const thunkResponse = await dispatch(fetchUserBoards(user.uid));
      const userBoards = await unwrapResult(thunkResponse);

      let navigateTo = PATHS.ROOT;
      const activeBoard = boardId
        ? userBoards.find(({ path }) => path === boardId)
        : userBoards[ 0 ];

      if (activeBoard) {
        navigateTo = `${ PATHS.BOARDS }/${ activeBoard.path }`;
      }

      navigate(navigateTo);
    }());

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
        <ModalWrapper />
      </div>
    </>
  );
};
