import { useContext } from 'react';
import { context } from '../context';

export const useConsumeContext = () => {
  const consumedContext = useContext(context);

  if (!consumedContext) {
    throw new Error('Context can be used only inside its provider.');
  }

  return consumedContext;
};
