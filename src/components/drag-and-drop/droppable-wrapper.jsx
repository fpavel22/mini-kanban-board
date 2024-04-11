import cn from 'classnames';
import { useDroppable } from '@dnd-kit/core';

export const DroppableWrapper = ({
  status,
  darkMode,
  className,
  children,
  ...props
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status
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
