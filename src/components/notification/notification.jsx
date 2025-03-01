import cn from 'classnames';

import './notification.scss';

export const Notification = ({
  children,
  className,
  darkMode,
  ...props
}) => {
  const _className = cn('notification', {
    'notification--d-mode': darkMode
  }, className);

  return <div { ...props } className={ _className }>{ children }</div>;
};
