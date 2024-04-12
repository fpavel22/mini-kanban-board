import { DndContext } from '@dnd-kit/core';

export const DragAndDrop = ({
  sensors,
  items,
  children,
  onDragEnd = () => {}
}) => {
  function handleDrag(event) {
    if (event.active && event.over) {
      const { id: currentItemId } = event.active;
      const { id: droppableId } = event.over;

      const draggedItem = items.find(({ id }) => id === currentItemId);

      if (draggedItem) {
        const item = {
          ...draggedItem,
          droppableId
        };

        onDragEnd(item);
      }
    }
  }

  return (
    <DndContext sensors={ sensors } onDragEnd={ handleDrag }>
      { children }
    </DndContext>
  );
};
