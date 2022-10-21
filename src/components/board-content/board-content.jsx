import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Button } from '../button';
import { CardsSection } from '../cards-section';
import { toggleTaskForm } from '../../features/showModalSlice';
import { tasksSelector, getAllTasks } from '../../features/tasksSlice';
import { boardsSelector } from '../../features/boardsSlice';
import { useGetDocuments } from '../../hooks';
import { filterTasksByStatus } from '../../utils/board-content';
import { FIREBASE_QUERY, FIREBASE_COLLECTIONS, BOARD_CONTENT_LABELS } from '../../constants';

export const BoardContent = ({ sidebarVisible }) => {
  const { tasksList } = useSelector(tasksSelector);
  const boards = useSelector(boardsSelector);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { loading, getCollectionDocs } = useGetDocuments(FIREBASE_COLLECTIONS.TASKS);

  const isBoardCreated = boards.length > 0;
  const isBoardEmpty = tasksList.length === 0;

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
          tasks={ filterTasksByStatus(tasksList, status) } />
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
    async function getTasks() {
      if (boardId) {
        const results = await getCollectionDocs(FIREBASE_QUERY.PAGE_ID, boardId);
        dispatch(getAllTasks(results));
      } else {
        dispatch(getAllTasks([]));
      }
    }

    getTasks();
  }, [ boardId ]);

  return (
    <div className={ _className }>
      { loading
        ? <p>Loading...</p>
        : tasksList.length > 0 ? renderCardSections() : renderEmptyBoard() }
    </div>
  );
};
