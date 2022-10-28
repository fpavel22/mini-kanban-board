import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { SIZE } from '../../constants';

export const Button = ({
  variety,
  size,
  className,
  children,
  ...props
}) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('btn', {
    [ `btn--${ variety }` ]: variety,
    [ `btn--${ size }` ]: size === SIZE.LG,
    'btn--d-mode': darkMode
  }, className);

  return <button { ...props } className={ _className }>{ children }</button>;
};
