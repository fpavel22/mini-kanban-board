import { useState } from 'react';
import { usePopper } from 'react-popper';

import { POPPER_PLACEMENTS } from '../constants';

export const usePositionPopup = (modifiers, placement = POPPER_PLACEMENTS.bottom) => {
  const [ _parentRef, setParentRef ] = useState(null);
  const [ _referenceRef, setReferenceRef ] = useState(null);

  const {
    styles: {
      popper: popperStyles
    }
  } = usePopper(_parentRef, _referenceRef, { modifiers, placement });

  return {
    popperStyles,
    setParentRef,
    setReferenceRef
  };
};
