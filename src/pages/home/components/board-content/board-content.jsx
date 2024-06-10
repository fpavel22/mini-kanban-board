import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { BoardColumn, DroppableWrapper } from '@components';
import { Button } from '@components/ui';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import {
  allTasksSelector,
  tasksStatusSelector,
  fetchTasks,
  selectTask
} from '@/features/tasksSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';
import { filterTasksByStatus } from '@/utils/utils';
import { useSidebarVisibleContext } from '@/hooks';
import { BOARD_CONTENT_LABELS, MODAL_CONTENT, THUNK_STATUS } from '@/constants';

import { DndWrapper } from './dnd-wrapper';

export const BoardContent = () => {
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const user = useSelector(userSelector);
  const darkMode = useSelector(themeSliceSelector);

  const tasks = useSelector(allTasksSelector);
  const tasksFetchStatus = useSelector(tasksStatusSelector);

  const dispatch = useDispatch();

  const { boardId } = useParams();
  const sidebarVisible = useSidebarVisibleContext();

  const boardsEmpty = boards.length === 0;
  const tasksEmpty = tasks.length === 0;

  const isLoading = (
    boardsStatus === THUNK_STATUS.LOADING || tasksFetchStatus === THUNK_STATUS.LOADING
  );

  const _className = cn('board__content', {
    'board__content--expanded': !sidebarVisible,
    'board__content--empty': isLoading || tasksEmpty
  });

  function showTaskForm() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  }

  function showTaskView(task) {
    dispatch(selectTask(task));
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }

  const createEmptyBoard = (
    <div className="empty__board">
      <p>
        { boardsEmpty
          ? 'You haven\'t created a board yet. Create a new board first to be able to add tasks.'
          : 'This board is empty. Create a new task to get started.' }
      </p>
      { !boardsEmpty && (
        <Button variety="primary" darkMode={ darkMode } onClick={ showTaskForm }>
          + Add New Task
        </Button>
      ) }
    </div>
  );

  const createBoardColumns = (
    <DndWrapper tasks={ tasks }>
      { BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
        <DroppableWrapper key={ status } status={ status } darkMode={ darkMode }>
          <BoardColumn
            darkMode={ darkMode }
            status={ status }
            sectionTitle={ sectionTitle }
            isDraggable={ true }
            columnItems={ filterTasksByStatus(tasks, status) }
            onItemClick={ showTaskView }
          />
        </DroppableWrapper>
      )) }
    </DndWrapper>
  );

  const content = tasksEmpty ? createEmptyBoard : createBoardColumns;

  useEffect(() => {
    const ids = {
      boardId,
      userId: user.uid
    };

    dispatch(fetchTasks(ids));
  }, []);

  return (
    <div className={ _className }>
      { isLoading ? <p>Loading...</p> : content }
    </div>
  );
};
