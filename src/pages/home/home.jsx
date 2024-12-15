import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  BoardContent,
  ModalWrapper,
  Navbar,
  Sidebar
} from '@/pages/home/components';
import { fetchUserBoards, resetUserBoards } from '@/features/boardsSlice';
import { enableDarkTheme, enableLightTheme } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { useSidebarToggleContext } from '@/context';
import { useDispatchUnwrapper } from '@/hooks';
import { loadFromLocalStorage } from '@/utils';
import { PATHS } from '@/constants';

export const Home = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { boardId } = useParams();

  const setSidebarVisible = useSidebarToggleContext();
  const unwrapDispatch = useDispatchUnwrapper();

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

  useEffect(() => {
    const preferences = loadFromLocalStorage(user.uid);

    if (preferences) {
      const { darkMode, sidebarVisible } = preferences;

      dispatch(darkMode ? enableDarkTheme() : enableLightTheme());
      setSidebarVisible(sidebarVisible);
    }
  }, [ dispatch, setSidebarVisible, user.uid ]);

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
