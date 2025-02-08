import cn from 'classnames';

import { Card } from '../card';
import { ColumnItem } from '../column-item';

import './board-column.scss';

export const BoardColumn = ({
  darkMode,
  columnItems,
  Column = ColumnItem,
  onItemClick,
  sectionTitle,
  status,
  ...props
}) => {
  const _className = cn('cards__section', {
    'cards__section--dark': darkMode
  });

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  const columnTitle = `${ sectionTitle } (${ columnItems.length })`;

  function handleItemClick(task) {
    return () => {
      onItemClick?.(task);
    };
  }

  return (
    <div className={ _className }>
      <p className="cards__section-title">
        <span className={ sectionStatusClassName } />
        <span className="cards__section-items">
          { columnTitle }
        </span>
      </p>
      <div className="cards__section-content">
        { columnItems.map((task) => {
          const {
            id,
            priority,
            subtasks,
            title
          } = task;
          const subtasksCount = subtasks.length;
          const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

          return (
            <Column
              { ...props }
              key={ id }
              id={ id }
              onClick={ handleItemClick(task) }
            >
              <Card
                darkMode={ darkMode }
                description={ subtasksCount
                  ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
                  : 'No subtasks added' }
                priority={ priority }
                title={ title }
              />
            </Column>
          );
        }) }
      </div>
    </div>
  );
};
