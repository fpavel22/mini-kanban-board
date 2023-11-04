import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '@/features/themeSlice';

export const Notification = ({ className, children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('notification', {
    'notification--d-mode': darkMode
  }, className);

  return <div { ...props } className={ _className }>{ children }</div>;
};
