import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { tasksSelector, getAllTasks } from '../../features/tasksSlice';
import { CardsSection } from '../cards-section';
import { BOARD_CONTENT_LABELS } from '../../constants';
import { filterTasksByStatus } from '../../utils/board-content';

import mockData from '../../tasksList.json';
import './board-content.scss';

export const BoardContent = () => {
  const { tasksList } = useSelector(tasksSelector);
  const dispatch = useDispatch();
  
  const renderCardSections = () => (
    BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
      <CardsSection key={ status }
          sectionTitle={ sectionTitle }
          status={ status }
          items={ filterTasksByStatus(tasksList, status) } />
    ))
  );

  const renderEmptyBoard = () => (
    <div className="empty__board">
      <p>This board is empty. Create a new task to get started.</p>
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
