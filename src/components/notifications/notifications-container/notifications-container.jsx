import cn from 'classnames';

import './notifications-container.scss';

export const NotificationsContainer = ({ children, darkMode }) => {
  const _className = cn('notifications-container', {
    'notifications-container--d-mode': darkMode
  });

  return (
    <div className={ _className }>{ children }</div>
  );
};
