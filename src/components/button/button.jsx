import cn from 'classnames';

import './button.scss';

export const Button = ({
  children,
  className,
  darkMode,
  size,
  variety,
  ...props
}) => {
  const _className = cn('btn', {
    'btn--d-mode': darkMode,
    [ `btn--${ size }` ]: size,
    [ `btn--${ variety }` ]: variety,
  }, className);

  return <button { ...props } className={ _className }>{ children }</button>;
};
