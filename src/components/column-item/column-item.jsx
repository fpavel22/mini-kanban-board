import { DraggableWrapper } from '../drag-and-drop';

export const ColumnItem = ({
  children,
  id,
  isDraggable,
  ...props
}) => (
  isDraggable ? (
    <DraggableWrapper { ...props } id={ id }>
      { children }
    </DraggableWrapper>
  ) : children
);
