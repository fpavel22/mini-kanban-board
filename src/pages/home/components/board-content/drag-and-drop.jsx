import { useDispatch } from 'react-redux';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';

import { setTask } from '@/features/tasksSlice';

export const DragAndDrop = ({ tasks, children }) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    })
  );

  function handleDrag(event) {
    if (event.active && event.over) {
      const { id: currentTask } = event.active;
      const { id: status } = event.over;

      const draggedTask = tasks.find(({ id }) => id === currentTask);

      if (draggedTask) {
        const task = {
          ...draggedTask,
          status
        };

        dispatch(setTask(task));
      }
    }
  }

  return (
    <DndContext sensors={ sensors } onDragEnd={ handleDrag }>
      { children }
    </DndContext>
  );
};
