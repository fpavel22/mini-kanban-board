import { Link } from 'react-router-dom';
import cn from 'classnames';

import iconBoard from '@/assets/icon-board.svg';

export const SidebarNavigationItem = ({ path, pageName, isActive }) => {
  const _className = cn('sidebar__navigation-item', {
    'sidebar__navigation-item--active': isActive
  });

  return (
    <li className={ _className }>
      <Link to={ `/boards/${ path }` }>
        <img src={ iconBoard } alt="Board icon" />
        <span>{ pageName }</span>
      </Link>
    </li>
  );
};
