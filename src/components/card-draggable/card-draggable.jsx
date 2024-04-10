import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const CardDraggable = ({ id, children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({ id });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div
      { ...props }
      { ...attributes }
      { ...listeners }
      style={ style }
      ref={ setNodeRef }
    >
      { children }
    </div>
  );
};
