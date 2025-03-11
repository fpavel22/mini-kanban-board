import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const DraggableWrapper = ({ children, id, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({ id });

  return (
    <div
      { ...props }
      { ...attributes }
      { ...listeners }
      ref={ setNodeRef }
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      { children }
    </div>
  );
};
