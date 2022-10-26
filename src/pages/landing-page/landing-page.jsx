import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { modalOpenSelector, modalContentSelector } from '../../features/modalSlice';
import {
  BoardContent,
  BoardForm,
  CardModal,
  Navbar,
  Sidebar,
  TaskForm,
  TaskView,
  TaskDelete
} from '../../components';
import { allBoardsSelector, boardsStatusSelector } from '../../features/boardsSlice';
import { fetchTasks } from '../../features/tasksSlice';
import { userSelector } from '../../features/userSlice';
import { applyPageOverflow } from '../../utils/utils';
import { MODAL_CONTENT, THUNK_STATUS } from '../../constants';

export const LandingPage = () => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const boards = useSelector(allBoardsSelector);
  const boardsFetchStatus = useSelector(boardsStatusSelector);
  const user = useSelector(userSelector);
  const modalOpen = useSelector(modalOpenSelector);
  const modalContent = useSelector(modalContentSelector);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { boardId } = useParams();

  const renderCardModalContent = () => {
    switch (modalContent) {
      case MODAL_CONTENT.BOARD_FORM:
        return <BoardForm />;
      case MODAL_CONTENT.TASK_DELETE:
        return <TaskDelete />;
      case MODAL_CONTENT.TASK_FORM_ADD:
        return <TaskForm />;
      case MODAL_CONTENT.TASK_FORM_EDIT:
        return <TaskForm editing={ true } />
      case MODAL_CONTENT.TASK_VIEW:
        return <TaskView />;
      default:
        return null;
    }
  }

  const sidebarProps = {
    sidebarVisible,
    setSidebarVisible
  };

  useEffect(() => {
    applyPageOverflow(modalOpen);
  }, [ modalOpen ]);

  useEffect(() => {
    if (boardsFetchStatus === THUNK_STATUS.SUCCEEDED) {
      const userBoards = boards.map(({ path }) => path);

      if (!userBoards.includes(boardId)) {
        if (boards.length > 0) {
          const [ board ] = boards;
          
          navigate(`/boards/${ board.path }`);
        } else {
          navigate('/');
        }
      }
    }
  }, [ boards ]);

  useEffect(() => {
    const ids = {
      boardId,
      userId: user.uid
    };

    dispatch(fetchTasks(ids));
  }, [ boardId ]);

  return (
    <>
      <Navbar { ...sidebarProps } />
      <div className="app__content-wrapper">
        <Sidebar { ...sidebarProps } />
        <BoardContent { ...sidebarProps } />
        { modalOpen && <CardModal>{ renderCardModalContent() }</CardModal> }
      </div>
    </>
  );
};
