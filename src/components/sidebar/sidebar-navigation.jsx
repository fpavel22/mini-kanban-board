import { useParams } from 'react-router-dom';

import iconBoard from '@/assets/icon-board.svg';

import { SidebarNavigationItem } from './sidebar-navigation-item';

export const SidebarNavigation = ({
  navigationBtnText,
  navigationItems = [],
  navigationTitle,
  onButtonClick
}) => {
  const { boardId } = useParams();

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">
        { navigationTitle }
      </p>
      <ul className="sidebar__navigation-items">
        { navigationItems.length > 0
          && navigationItems.map(({ path, pageName }) => (
            <SidebarNavigationItem
              isActive={ path === boardId }
              key={ path }
              pageName={ pageName }
              path={ path }
            />
          )) }
      </ul>
      <div className="sidebar__create" onClick={ onButtonClick }>
        <img alt="Icon board" src={ iconBoard } />
        <span>
          +
          {' '}
          { navigationBtnText }
        </span>
      </div>
    </div>
  );
};
