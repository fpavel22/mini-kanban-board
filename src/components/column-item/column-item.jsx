import { DraggableWrapper } from '../drag-and-drop';

export const ColumnItem = ({
  id,
  isDraggable,
  children,
  ...props
}) => (
  isDraggable ? (
    <DraggableWrapper { ...props } id={ id }>
      { children }
    </DraggableWrapper>
  ) : children
);
