import cn from 'classnames';

export const Notification = ({
  darkMode,
  className,
  children,
  ...props
}) => {
  const _className = cn('notification', {
    'notification--d-mode': darkMode
  }, className);

  return <div { ...props } className={ _className }>{ children }</div>;
};
