import { useEffect, useRef } from 'react';

export const useHandleClickOutside = (open, callback) => {
  const parentRef = useRef();
  const popupRef = useRef();

  useEffect(() => {
    function hidePopup(event) {
      const clickedPopupBody = popupRef?.current?.contains(event.target.closest('.popup__body'));
      const clickedToggleBody = parentRef?.current?.contains(event.target);

      if (open && !clickedPopupBody && !clickedToggleBody) {
        callback();
      }
    }

    window.addEventListener('click', hidePopup);

    return () => {
      window.removeEventListener('click', hidePopup);
    }
  }, [ open, parentRef, popupRef ]);

  return { parentRef, popupRef };
};
