import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { tasksSelector, fetchTasks } from '../../features/tasksSlice';
import { showModalSelector } from '../../features/showModalSlice';
import { CardsSection } from './cards-section';
import { CardModal } from '../card-modal';
import { TaskView } from '../task-view';

import { filterTasksByStatus } from '../../utils/board-content';
import { BOARD_CONTENT_LABELS } from '../../constants';

import mockData from '../../mock-content.json';
import './board-content.scss';

export const BoardContent = () => {
  const [ selected, setSelected ] = useState(null);

  const { showTaskDetailsModal } = useSelector(showModalSelector);
  const tasks = useSelector(tasksSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks(mockData));
  }, []);

  return (
    <>
      <div className="board__content">
        { tasks.length > 0
          ? (
            <>
              { BOARD_CONTENT_LABELS.map(({ status, sectionTitle }) => (
                <CardsSection key={ status }
                    status={ status }
                    sectionTitle={ sectionTitle }
                    items={ filterTasksByStatus(tasks, status) }
                    setSelected={ setSelected } />
              )) }
            </>
          )
          : (
          <div className="empty__board">
            <p>This board is empty. Create a new task to get started.</p>
          </div>
        ) }
      </div>
      { showTaskDetailsModal && (
        <CardModal>
          <TaskView title={ selected.title }
              description={ selected.description }
              subtasks={ selected.subtasks } />
        </CardModal>
      ) }
    </>
  );
};
