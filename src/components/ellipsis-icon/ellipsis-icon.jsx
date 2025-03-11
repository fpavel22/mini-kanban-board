import { forwardRef, memo } from 'react';

import iconEllipsis from '@/assets/icon-vertical-ellipsis.svg';

export const EllipsisIcon = memo(
  forwardRef(({ alt = 'Ellipsis icon', ...props }, ref) => (
    <img
      { ...props }
      alt={ alt }
      ref={ ref }
      src={ iconEllipsis }
    />
  ))
);
