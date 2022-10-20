import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Button } from '../button';
import { CardsSection } from '../cards-section';
import { toggleTaskForm } from '../../features/showModalSlice';
import { tasksSelector, getAllTasks } from '../../features/tasksSlice';
import { useGetDocuments } from '../../hooks';
import { filterTasksByStatus } from '../../utils/board-content';
import { FIREBASE_QUERY, FIREBASE_COLLECTIONS, BOARD_CONTENT_LABELS } from '../../constants';

export const BoardContent = () => {
  const { tasksList } = useSelector(tasksSelector);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { loading, error, getCollectionDocs } = useGetDocuments(FIREBASE_COLLECTIONS.TASKS);

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
      <p>This board is empty. Create a new task to get started.</p>
      <Button type="primary" onClick={ handleAddTask }>+ Add New Task</Button>
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
    <div className="board__content">
      { loading
        ? <p>Loading...</p>
        : tasksList.length > 0 ? renderCardSections() : renderEmptyBoard() }
    </div>
  );
};
