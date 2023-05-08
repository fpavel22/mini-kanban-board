import { useSelector } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';

import { Card } from '../card';
import { themeSliceSelector } from '../../features/themeSlice';

export const CardsSection = ({ status, sectionTitle, tasks }) => {
  const darkMode = useSelector(themeSliceSelector);
  const { setNodeRef } = useDroppable({
    id: status
  });

  const _className = cn('cards__section', {
    'cards__section--dark': darkMode
  });

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  const cardsSectionItems = `${ sectionTitle } (${ tasks.length })`;

  return (
    <section className={ _className } ref={ setNodeRef }>
      <p className="cards__section-title">
        <span className={ sectionStatusClassName } />
        <span className="cards__section-items">
          { cardsSectionItems }
        </span>
      </p>
      <div className="cards__section-content">
        { tasks.map((task) => <Card key={ task.id } task={ task } />) }
      </div>
    </section>
  );
};
