import {
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  BoardColumn,
  Button,
  DndContext,
  DraggableWrapper,
  DroppableWrapper,
  NotificationsContainer,
  Notification,
  Spinner
} from '@/components';
import {
  BUTTON_VARIETIES,
  MODAL_CONTENT,
  SIZE,
  THUNK_STATUS
} from '@/constants';
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
import { useTaskOperations } from '@/hooks';

import './board-content.scss';

const BOARD_CONTENT_LABELS = [
  { status: 'to_do', sectionTitle: 'To do' },
  { status: 'in_progress', sectionTitle: 'In progress' },
  { status: 'in_review', sectionTitle: 'In review' },
  { status: 'done', sectionTitle: 'Done' }
];

const NOTIFICATION_FADE_MS = 2500;

const MAX_DESCRIPTION_LENGTH = 24;

const getItemTitle = (description) => (
  description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH).trim() }...`
    : description
);

const filterTasksByStatus = (tasks, taskStatus) => {
  const filteredTasks = tasks.filter(({ status }) => status === taskStatus);

  return filteredTasks;
};

const ColumnItem = ({
  children,
  id
}) => (
  <DraggableWrapper id={ id }>
    { children }
  </DraggableWrapper>
);

export const BoardContent = () => {
  const [ notifications, setNotifications ] = useState([]);

  const dispatch = useDispatch();

  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const darkMode = useSelector(themeSliceSelector);

  const tasks = useSelector(allTasksSelector);
  const tasksFetchStatus = useSelector(tasksStatusSelector);

  const user = useSelector(userSelector);

  const { boardId } = useParams();
  const sidebarVisible = useSidebarVisibleContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    })
  );

  const { updateTask } = useTaskOperations();

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

  function handleDragEnd({ itemId, droppableId }) {
    const draggedItem = tasks?.find(({ id }) => id === itemId);

    if (draggedItem) {
      const updatedTask = {
        ...draggedItem,
        status: droppableId
      };

      updateTask(updatedTask).catch(() => {
        setNotifications((prevNotifications) => {
          const hasNotification = prevNotifications.find(({ id }) => id === itemId);

          if (hasNotification) {
            return prevNotifications;
          }

          return prevNotifications.concat({
            id: itemId,
            message: `Could not update ${getItemTitle(
              draggedItem.title
            )}'s status.`,
          });
        });

        setTimeout(() => {
          setNotifications((prevNotifications) => (
            prevNotifications.filter(({ id }) => id !== itemId)
          ));
        }, NOTIFICATION_FADE_MS);
      });
    }
  }

  const emptyBoard = (
    <div className="empty__board">
      <p>
        { boardsEmpty
          ? 'You haven\'t created a board yet. Create a new board first to be able to add tasks.'
          : 'This board is empty. Create a new task to get started.' }
      </p>
      { !boardsEmpty && (
        <Button
          darkMode={ darkMode }
          onClick={ showTaskForm }
          variety={ BUTTON_VARIETIES.PRIMARY }
        >
          + Add New Task
        </Button>
      ) }
    </div>
  );

  const boardColumns = (
    <>
      <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
        { BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
          <DroppableWrapper darkMode={ darkMode } id={ status } key={ status }>
            <BoardColumn
              Column={ ColumnItem }
              columnItems={ filterTasksByStatus(tasks, status) }
              darkMode={ darkMode }
              onItemClick={ showTaskView }
              status={ status }
              title={ sectionTitle }
            />
          </DroppableWrapper>
        )) }
      </DndContext>
      { notifications.length > 0 && (
        <NotificationsContainer darkMode={ darkMode }>
          { notifications.map(({ id, message }) => (
            <Notification key={ id } type="error">{ message }</Notification>
          )) }
        </NotificationsContainer>
      ) }
    </>
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
