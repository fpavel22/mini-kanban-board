import { useState } from 'react';
import { usePopper } from 'react-popper';

import { POPPER_PLACEMENTS } from '@/constants';

export const usePositionPopup = (modifiers, placement = POPPER_PLACEMENTS.bottom) => {
  const [ parentRef, setParentRef ] = useState(null);
  const [ referenceRef, setReferenceRef ] = useState(null);

  const {
    styles: {
      popper: popperStyles
    }
  } = usePopper(parentRef, referenceRef, { modifiers, placement });

  return {
    popperStyles,
    setParentRef,
    setReferenceRef
  };
};
