import { useContext } from 'react';
import { Context } from '@/context';

export const useSidebarContext = () => {
  const consumedContext = useContext(Context);

  if (!consumedContext) {
    throw new Error('Context can be used only inside its provider.');
  }

  return consumedContext;
};
