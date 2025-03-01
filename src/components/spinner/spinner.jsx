import cn from 'classnames';

import './spinner.scss';

export const Spinner = ({
  className,
  darkMode,
  fullPage,
  size,
  ...props
}) => {
  const _className = cn('spinner', {
    'spinner--d-mode': darkMode,
    [ `spinner--${ size }` ]: size
  }, className);

  const spinner = <span { ...props } className={ _className } />;

  return fullPage ? (
    <div className="spinner-overlay">{ spinner }</div>
  ) : spinner;
};
