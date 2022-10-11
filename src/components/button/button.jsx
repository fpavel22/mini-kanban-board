import cn from 'classnames';
import { useSelector } from 'react-redux';

import { themeSliceSelector } from '../../features/themeSlice';
import { SIZE } from '../../constants';
import './button.scss';

export const Button = ({ type, size, className, children, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('btn', {
    [ `btn--${ type }` ]: type,
    [ `btn--${ size }` ]: size === SIZE.LG,
    [ `btn--d-mode` ]: darkMode
  }, className);

  return <button { ...props } className={ _className }>{ children }</button>
}