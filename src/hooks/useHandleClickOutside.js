import { useEffect, useRef } from 'react';

export const useHandleClickOutside = (isOpen, callback) => {
  const triggerRef = useRef();
  const popupRef = useRef();

  useEffect(() => {
    function hidePopup(event) {
      const hasClickedPopupBody = popupRef.current?.contains(event.target.closest('.popup__body'));
      const hasClickedTriggerBody = triggerRef.current?.contains(event.target);

      if (isOpen && !hasClickedPopupBody && !hasClickedTriggerBody) {
        callback?.();
      }
    }

    window.addEventListener('click', hidePopup);

    return () => {
      window.removeEventListener('click', hidePopup);
    };
  }, [ isOpen, callback ]);

  return { triggerRef, popupRef };
};
