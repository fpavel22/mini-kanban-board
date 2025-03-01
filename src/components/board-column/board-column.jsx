import cn from 'classnames';

import { Card } from '../card';
import { DraggableWrapper } from '../drag-and-drop';

import './board-column.scss';

const ColumnItem = ({
  children,
  id,
  isDraggable
}) => (
  isDraggable ? (
    <DraggableWrapper id={ id }>
      { children }
    </DraggableWrapper>
  ) : children
);

export const BoardColumn = ({
  columnItems,
  Column = ColumnItem,
  darkMode,
  isDraggable,
  onItemClick,
  status,
  title
}) => {
  const _className = cn('board-column', {
    'board-column--dark': darkMode
  });

  const sectionStatusClassName = cn('board-column-status', {
    [ `board-column-status--${ status }` ]: status
  });

  const columnTitle = `${ title } (${ columnItems.length })`;

  function handleItemClick(task) {
    return () => {
      onItemClick?.(task);
    };
  }

  return (
    <div className={ _className }>
      <p className="board-column-title">
        <span className={ sectionStatusClassName } />
        <span className="board-column-items">
          { columnTitle }
        </span>
      </p>
      <div className="board-column-content">
        { columnItems.map((columnItem) => {
          const {
            id,
            priority,
            subtasks,
            title: cardTitle
          } = columnItem;
          const subtasksCount = subtasks.length;
          const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

          return (
            <Column
              key={ id }
              id={ id }
              isDraggable={ isDraggable }
            >
              <Card
                darkMode={ darkMode }
                description={ subtasksCount
                  ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
                  : 'No subtasks added' }
                onClick={ handleItemClick(columnItem) }
                priority={ priority }
                title={ cardTitle }
              />
            </Column>
          );
        }) }
      </div>
    </div>
  );
};
