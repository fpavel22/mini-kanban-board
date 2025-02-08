import { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PATHS } from '@/constants';
import { useSidebarToggleContext } from '@/context';
import { fetchUserBoards, resetUserBoards } from '@/features/boardsSlice';
import { enableDarkTheme, enableLightTheme } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { useDispatchUnwrapper } from '@/hooks';
import { loadFromLocalStorage } from '@/utils';

import { BoardContent } from './home/board-content';
import { ModalWrapper } from './home/modal-wrapper';
import { Navbar } from './home/navbar';
import { Sidebar } from './home/sidebar';

export const Home = () => {
  const dispatch = useDispatch();
  const unwrapDispatch = useDispatchUnwrapper();
  const user = useSelector(userSelector);

  const navigate = useNavigate();
  const { boardId } = useParams();

  const setSidebarVisible = useSidebarToggleContext();

  useLayoutEffect(() => {
    const preferences = loadFromLocalStorage(user.uid);

    if (preferences) {
      const { darkMode, sidebarVisible } = preferences;

      dispatch(darkMode ? enableDarkTheme() : enableLightTheme());
      setSidebarVisible(sidebarVisible);
    }
  }, [ dispatch, setSidebarVisible, user.uid ]);

  useEffect(() => {
    (async function () {
      const userBoards = await unwrapDispatch(fetchUserBoards(user.uid));

      if (userBoards.length > 0) {
        const [ userBoard ] = userBoards;
        let activeBoard = boardId && userBoards.find(({ path }) => path === boardId);

        if (!activeBoard) {
          activeBoard = userBoard;
        }

        navigate(`${ PATHS.BOARDS }/${ activeBoard.path }`);
      }
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
