import { useContext } from 'react';
import { SidebarToggleContext } from '@/context';

export const useSidebarToggleContext = () => {
  const consumedContext = useContext(SidebarToggleContext);

  if (consumedContext === null) {
    throw new Error('Context can be used only inside its provider.');
  }

  return consumedContext;
};
