import cn from 'classnames';

import { ColumnItem as CardColumnItem } from '@components/column-item';

export const BoardColumn = ({
  darkMode,
  status,
  sectionTitle,
  columnItems,
  itemType = CardColumnItem,
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

  const ColumnItem = itemType;

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
        { columnItems.map((task) => (
          <ColumnItem
            { ...props }
            key={ task.id }
            id={ task.id }
            task={ task }
            darkMode={ darkMode }
            onClick={ handleItemClick(task) }
          />
        )) }
      </div>
    </div>
  );
};
