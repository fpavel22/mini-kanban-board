import cn from 'classnames';

import './notification.scss';

export const Notification = ({ children, className, type }) => {
  const _className = cn('notification', {
    [ `notification--${type}` ]: type
  }, className);

  return <div className={ _className }>{ children }</div>;
};
