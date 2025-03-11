import { Link } from 'react-router-dom';
import cn from 'classnames';

import iconBoard from '@/assets/icon-board.svg';
import { PATHS } from '@/constants';

export const SidebarNavigationItem = ({ isActive, pageName, path }) => {
  const _className = cn('sidebar__navigation-item', {
    'sidebar__navigation-item--active': isActive
  });

  return (
    <li className={ _className }>
      <Link to={ `${ PATHS.BOARDS }/${ path }` }>
        <img alt="Board icon" src={ iconBoard } />
        <span>{ pageName }</span>
      </Link>
    </li>
  );
};
