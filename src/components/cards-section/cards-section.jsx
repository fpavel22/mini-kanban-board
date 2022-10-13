import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { Card } from '../card';
import { showTaskDetailsModal } from '../../features/showModalSlice';
import { selectTask } from '../../features/tasksSlice';

import './cards-section.scss';

export const CardsSection = ({ status, sectionTitle, items }) => {
  const dispatch = useDispatch();

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  function showTaskDetails(item) {
    dispatch(selectTask(item));
    dispatch(showTaskDetailsModal());
  }

  function renderTaskCards(item) {
    const { title, subtasks } = item;
    const tasks = subtasks.length;
    const tasksCompleted = subtasks.filter(({ completed }) => completed).length;
    
    return (
      <Card key={ title }
          title={ title }
          tasks={ tasks }
          tasksCompleted={ tasksCompleted }
          onClick={ () => showTaskDetails(item) } />
    );
  }

  return (
    <section className="cards__section">
      <p className="cards__section-title">
        <span className={ sectionStatusClassName } />
        <span className="cards__section-items">{ sectionTitle } ({ items.length })</span>
      </p>
      <div className="cards__section-content">
        { items.map((item) => renderTaskCards(item)) }
      </div>
    </section>
  );
};
