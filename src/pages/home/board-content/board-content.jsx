import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  BoardColumn,
  Button,
  DroppableWrapper,
  Spinner
} from '@/components';
import { MODAL_CONTENT, SIZE, THUNK_STATUS } from '@/constants';
import { useSidebarVisibleContext } from '@/context';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import {
  allTasksSelector,
  fetchBoardTasks,
  selectTask,
  tasksStatusSelector
} from '@/features/tasksSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { userSelector } from '@/features/userSlice';

import { DragAndDrop } from '../drag-and-drop';

import './board-content.scss';

const BOARD_CONTENT_LABELS = [
  { status: 'to_do', sectionTitle: 'To do' },
  { status: 'in_progress', sectionTitle: 'In progress' },
  { status: 'in_review', sectionTitle: 'In review' },
  { status: 'done', sectionTitle: 'Done' }
];

const filterTasksByStatus = (tasks, taskStatus) => {
  const filteredTasks = tasks.filter(({ status }) => status === taskStatus);

  return filteredTasks;
};

export const BoardContent = () => {
  const dispatch = useDispatch();

  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const darkMode = useSelector(themeSliceSelector);

  const user = useSelector(userSelector);

  const tasks = useSelector(allTasksSelector);
  const tasksFetchStatus = useSelector(tasksStatusSelector);

  const { boardId } = useParams();
  const sidebarVisible = useSidebarVisibleContext();

  const boardsEmpty = boards.length === 0;
  const tasksEmpty = tasks.length === 0;

  const isLoading = (
    boardsStatus === THUNK_STATUS.LOADING || tasksFetchStatus === THUNK_STATUS.LOADING
  );

  const _className = cn('board__content', {
    'board__content--empty': isLoading || tasksEmpty,
    'board__content--expanded': !sidebarVisible
  });

  function showTaskForm() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  }

  function showTaskView(task) {
    dispatch(selectTask(task));
    dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
  }

  const emptyBoard = (
    <div className="empty__board">
      <p>
        { boardsEmpty
          ? 'You haven\'t created a board yet. Create a new board first to be able to add tasks.'
          : 'This board is empty. Create a new task to get started.' }
      </p>
      { !boardsEmpty && (
        <Button darkMode={ darkMode } onClick={ showTaskForm } variety="primary">
          + Add New Task
        </Button>
      ) }
    </div>
  );

  const boardColumns = (
    <DragAndDrop tasks={ tasks }>
      { BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
        <DroppableWrapper darkMode={ darkMode } id={ status } key={ status }>
          <BoardColumn
            columnItems={ filterTasksByStatus(tasks, status) }
            darkMode={ darkMode }
            isDraggable={ true }
            onItemClick={ showTaskView }
            sectionTitle={ sectionTitle }
            status={ status }
          />
        </DroppableWrapper>
      )) }
    </DragAndDrop>
  );

  const content = tasksEmpty ? emptyBoard : boardColumns;

  useEffect(() => {
    const ids = {
      boardId,
      userId: user.uid
    };

    dispatch(fetchBoardTasks(ids));
  }, []);

  return (
    <div className={ _className }>
      { isLoading ? <Spinner darkMode={ darkMode } size={ SIZE.SM } /> : content }
    </div>
  );
};
