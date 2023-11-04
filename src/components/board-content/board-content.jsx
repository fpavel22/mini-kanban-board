import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';
import cn from 'classnames';

import { Button } from '@components/button';
import { CardsSection } from '@components/cards-section';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { openModal } from '@/features/modalSlice';
import {
  setTask,
  allTasksSelector,
  tasksStatusSelector
} from '@/features/tasksSlice';
import { filterTasksByStatus } from '@/utils/board-content';
import { useConsumeContext } from '@/hooks';
import { BOARD_CONTENT_LABELS, MODAL_CONTENT, THUNK_STATUS } from '@/constants';

export const BoardContent = () => {
  const boards = useSelector(allBoardsSelector);
  const tasks = useSelector(allTasksSelector);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    })
  );

  const boardsFetchStatus = useSelector(boardsStatusSelector);
  const tasksFetchStatus = useSelector(tasksStatusSelector);

  const { sidebarVisible } = useConsumeContext();

  const dispatch = useDispatch();

  const boardsEmpty = boards.length === 0;
  const tasksEmpty = tasks.length === 0;

  const _className = cn('board__content', {
    'board__content--expanded': !sidebarVisible,
    'board__content--empty': tasksEmpty
  });

  const isLoading = (
    boardsFetchStatus === THUNK_STATUS.LOADING || tasksFetchStatus === THUNK_STATUS.LOADING
  );

  function handleAddTask() {
    dispatch(openModal(MODAL_CONTENT.TASK_FORM_ADD));
  }

  const renderEmptyBoard = (
    <div className="empty__board">
      <p>
        { boardsEmpty
          ? 'You haven\'t created a board yet. Create a new board first to be able to add tasks.'
          : 'This board is empty. Create a new task to get started.' }
      </p>
      { !boardsEmpty && <Button variety="primary" onClick={ handleAddTask }>+ Add New Task</Button> }
    </div>
  );

  function handleDrag(event) {
    if (event.active && event.over) {
      const { id: currentTask } = event.active;
      const { id: status } = event.over;

      const draggedTask = tasks.find(({ id }) => id === currentTask);

      if (draggedTask) {
        const task = {
          ...draggedTask,
          status
        };

        dispatch(setTask(task));
      }
    }
  }

  const renderCardSections = (
    <DndContext sensors={ sensors } onDragEnd={ handleDrag }>
      { BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
        <CardsSection
          key={ status }
          status={ status }
          sectionTitle={ sectionTitle }
          tasks={ filterTasksByStatus(tasks, status) }
        />
      )) }
    </DndContext>
  );

  const content = tasksEmpty ? renderEmptyBoard : renderCardSections;

  return (
    <div className={ _className }>
      { isLoading ? <p>Loading...</p> : content }
    </div>
  );
};
