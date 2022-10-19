import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../button';
import { CardsSection } from '../cards-section';
import { toggleTaskForm } from '../../features/showModalSlice';
import { tasksSelector, getAllTasks } from '../../features/tasksSlice';

import { filterTasksByStatus } from '../../utils/board-content';
import { BOARD_CONTENT_LABELS } from '../../constants';

import mockData from '../../tasksList.json';

export const BoardContent = () => {
  const { tasksList } = useSelector(tasksSelector);
  const dispatch = useDispatch();

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
    dispatch(getAllTasks(mockData));
  }, []);

  return (
    <div className="board__content">
      { tasksList.length > 0 ? renderCardSections() : renderEmptyBoard() }
    </div>
  );
};
