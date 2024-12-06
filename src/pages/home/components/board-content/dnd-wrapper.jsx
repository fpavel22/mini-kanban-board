import { useDispatch } from 'react-redux';
import {
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';

import { DragAndDrop } from '@components';
import { updateTask } from '@/features/tasksSlice';

export const DndWrapper = ({ tasks, children }) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    })
  );

  function handleDrag(task) {
    if (task) {
      const { droppableId, ...rest } = task;

      const updatedTask = {
        ...rest,
        status: droppableId
      };

      dispatch(updateTask(updatedTask));
    }
  }

  return (
    <DragAndDrop sensors={ sensors } items={ tasks } onDragEnd={ handleDrag }>
      { children }
    </DragAndDrop>
  );
};
