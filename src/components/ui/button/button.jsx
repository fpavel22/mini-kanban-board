import cn from 'classnames';

import { SIZE } from '@/constants';

export const Button = ({
  variety,
  size,
  darkMode,
  className,
  children,
  ...props
}) => {
  const _className = cn('btn', {
    [ `btn--${ variety }` ]: variety,
    [ `btn--${ size }` ]: size === SIZE.LG,
    'btn--d-mode': darkMode
  }, className);

  return <button { ...props } className={ _className }>{ children }</button>;
};
