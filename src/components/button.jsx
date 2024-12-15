import cn from 'classnames';

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
    [ `btn--${ size }` ]: size,
    'btn--d-mode': darkMode
  }, className);

  return <button { ...props } className={ _className }>{ children }</button>;
};
