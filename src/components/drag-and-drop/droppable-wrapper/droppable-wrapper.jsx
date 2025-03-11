import { useDroppable } from '@dnd-kit/core';
import cn from 'classnames';

import './droppable-wrapper.scss';

export const DroppableWrapper = ({
  children,
  className,
  darkMode,
  id,
  ...props
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id
  });

  const _className = cn('droppable', {
    'droppable--dark': darkMode,
    'droppable--enabled': isOver
  }, className);

  return (
    <div { ...props } className={ _className } ref={ setNodeRef }>
      { children }
    </div>
  );
};
