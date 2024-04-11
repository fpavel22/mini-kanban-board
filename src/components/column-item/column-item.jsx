import { DraggableWrapper } from '@components/drag-and-drop';
import { Card } from '@components/ui';

export const ColumnItem = ({ id, isDraggable, ...props }) => {
  const card = <Card { ...props } />;

  return isDraggable ? (
    <DraggableWrapper id={ id }>
      { card }
    </DraggableWrapper>
  ) : card;
};
