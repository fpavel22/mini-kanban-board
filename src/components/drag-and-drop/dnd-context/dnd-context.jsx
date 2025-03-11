import { DndContext as DndKitContext } from '@dnd-kit/core';

export const DndContext = ({ children, onDragEnd, sensors }) => {
  function handleDragEnd(event) {
    if (event.active && event.over) {
      const { id: itemId } = event.active;
      const { id: droppableId } = event.over;

      onDragEnd?.({ itemId, droppableId });
    }
  }

  return (
    <DndKitContext onDragEnd={ handleDragEnd } sensors={ sensors }>
      { children }
    </DndKitContext>
  );
};
