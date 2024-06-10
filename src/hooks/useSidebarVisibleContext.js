import { useContext } from 'react';
import { SidebarVisibleContext } from '@/context';

export const useSidebarVisibleContext = () => {
  const consumedContext = useContext(SidebarVisibleContext);

  if (consumedContext === null) {
    throw new Error('Context can be used only inside its provider.');
  }

  return consumedContext;
};
