import cn from 'classnames';

import { ColumnItem } from '../column-item';
import { Card } from '../card';

export const BoardColumn = ({
  darkMode,
  status,
  sectionTitle,
  columnItems,
  itemType = ColumnItem,
  onItemClick = () => {},
  ...props
}) => {
  const _className = cn('cards__section', {
    'cards__section--dark': darkMode
  });

  const sectionStatusClassName = cn('cards__section-status', {
    [ `cards__section-status--${ status }` ]: status
  });

  const columnTitle = `${ sectionTitle } (${ columnItems.length })`;

  const Column = itemType;

  function handleItemClick(task) {
    return () => {
      onItemClick(task);
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
            title,
            id,
            subtasks,
            priority
          } = task;
          const subtasksCount = subtasks.length;
          const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

          return (
            <Column
              { ...props }
              key={ id }
              id={ id }
              darkMode={ darkMode }
              onClick={ handleItemClick(task) }
            >
              <Card
                darkMode={ darkMode }
                title={ title }
                priority={ priority }
                description={ subtasksCount
                  ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
                  : 'No subtasks added' }
              />
            </Column>
          );
        }) }
      </div>
    </div>
  );
};
