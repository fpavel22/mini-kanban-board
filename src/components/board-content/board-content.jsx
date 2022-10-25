import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Button } from '../button';
import { CardsSection } from '../cards-section';
import { boardsSliceSelectors } from '../../features/boardsSlice';
import { toggleTaskForm } from '../../features/modalSlice';
import { fetchTasks, tasksSliceSelectors } from '../../features/tasksSlice';
import { useGetDocuments } from '../../hooks';
import { filterTasksByStatus } from '../../utils/board-content';
import { FIREBASE_COLLECTIONS, BOARD_CONTENT_LABELS, THUNK_STATUS } from '../../constants';

export const BoardContent = ({ sidebarVisible }) => {
  const { boardsSelector } = boardsSliceSelectors;
  const { tasksSelector, statusSelector, errorSelector } = tasksSliceSelectors;

  const tasks = useSelector(tasksSelector);
  const tasksStatus = useSelector(statusSelector);
  const tasksError = useSelector(errorSelector);

  const boards = useSelector(boardsSelector);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { getCollectionDocs } = useGetDocuments(FIREBASE_COLLECTIONS.TASKS);

  const isBoardCreated = boards.length > 0;
  const isBoardEmpty = tasks.length === 0;

  const _className = cn("board__content", {
    "board__content--expanded": !sidebarVisible,
    "board__content--empty": isBoardEmpty
  });

  function handleAddTask() {
    dispatch(toggleTaskForm({ addNewTask: true, editTask: false }));
  }
  
  const renderCardSections = () => (
    BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
      <CardsSection key={ status }
          status={ status }
          sectionTitle={ sectionTitle }
          tasks={ filterTasksByStatus(tasks, status) } />
    ))
  );

  const renderEmptyBoard = () => (
    <div className="empty__board">
      <p>{ isBoardCreated
        ? 'This board is empty. Create a new task to get started.'
        : 'You haven\'t created a board yet. Create a new board first to be able to add tasks.' }</p>
      { isBoardCreated && <Button type="primary" onClick={ handleAddTask }>+ Add New Task</Button> }
      
    </div>
  );

  useEffect(() => {
    if (boardId) {
      const thunkArgs = {
        boardId,
        getCollectionDocs
      };

      dispatch(fetchTasks(thunkArgs));
    }
  }, [ boardId ]);

  return (
    <div className={ _className }>
      { tasksStatus === THUNK_STATUS.LOADING
        ? <p>Loading...</p>
        : tasks.length > 0 ? renderCardSections() : renderEmptyBoard() }
    </div>
  );
};
