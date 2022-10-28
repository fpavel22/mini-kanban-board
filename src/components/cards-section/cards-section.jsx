import cn from 'classnames';

import { Card } from '../card';

export const CardsSection = ({ status, sectionTitle, tasks }) => {
  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  const cardsSectionItems = `${ sectionTitle } (${ tasks.length })`;

  return (
    <section className="cards__section">
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
