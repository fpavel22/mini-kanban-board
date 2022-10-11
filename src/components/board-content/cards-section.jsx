import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { Card } from '../card';
import { showTaskDetailsModal } from '../../features/showModalSlice';

export const CardsSection = ({ status, sectionName, items, setSelected }) => {
  const dispatch = useDispatch();

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  function showTaskDetails(item) {
    setSelected(item);
    dispatch(showTaskDetailsModal());
  }

  return (
    <section className="cards__section">
      <p className="cards__section-title">
        <span className={ sectionStatusClassName } />
        <span className="cards__section-items">{ sectionName } ({ items.length })</span>
      </p>
      <div className="cards__section-content">
        { items.map((item) => {
          const { title, subtasks } = item;
          const tasks = subtasks.length;
          const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

          return (
            <Card title={ title }
                tasks={ tasks }
                tasksCompleted={ tasksCompleted }
                onClick={ () => showTaskDetails(item) } />
          );
        }) }
      </div>
    </section>
  );
}