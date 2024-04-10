import { useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';

import { Card } from '@components/ui';
import { CardDraggable } from '@components/card-draggable';
import { openModal } from '@/features/modalSlice';
import { selectTask } from '@/features/tasksSlice';
import { MODAL_CONTENT } from '@/constants';

export const BoardColumn = ({
  darkMode,
  status,
  sectionTitle,
  tasks
}) => {
  const dispatch = useDispatch();

  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  const _className = cn('cards__section', {
    'cards__section--dark': darkMode,
    'cards__section--droppable': isOver
  });

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  const cardsSectionItems = `${ sectionTitle } (${ tasks.length })`;

  function onCardClick(task) {
    return () => {
      dispatch(selectTask(task));
      dispatch(openModal(MODAL_CONTENT.TASK_VIEW));
    };
  }

  return (
    <section className={ _className } ref={ setNodeRef }>
      <p className="cards__section-title">
        <span className={ sectionStatusClassName } />
        <span className="cards__section-items">
          { cardsSectionItems }
        </span>
      </p>
      <div className="cards__section-content">
        { tasks.map((task) => (
          <CardDraggable
            key={ task.id }
            id={ task.id }
          >
            <Card
              task={ task }
              darkMode={ darkMode }
              onClick={ onCardClick(task) }
            />
          </CardDraggable>
        )) }
      </div>
    </section>
  );
};
