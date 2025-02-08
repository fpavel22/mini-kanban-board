import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { useDispatch } from 'react-redux';

import { updateTask } from '@/features/tasksSlice';

export const DragAndDrop = ({ tasks, children }) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    })
  );

  function handleDragEnd(event) {
    if (event.active && event.over) {
      const { id: currentItemId } = event.active;
      const { id: droppableId } = event.over;

      const draggedItem = tasks?.find(({ id }) => id === currentItemId);

      if (draggedItem) {
        const updatedTask = {
          ...draggedItem,
          status: droppableId
        };

        dispatch(updateTask(updatedTask));
      }
    }
  }

  return (
    <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
      { children }
    </DndContext>
  );
};
