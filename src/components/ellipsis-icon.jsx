import { forwardRef, memo } from 'react';

import iconEllipsis from '@/assets/icon-vertical-ellipsis.svg';

export const EllipsisIcon = memo(
  forwardRef(({ alt = 'Ellipsis icon', ...props }, ref) => (
    <img
      { ...props }
      src={ iconEllipsis }
      alt={ alt }
      ref={ ref }
    />
  ))
);
