import { SidebarNavigationItem } from '@components/sidebar/sidebar-navigation-item';

import iconBoard from '@/assets/icon-board.svg';
import { useParams } from 'react-router-dom';

export const SidebarNavigation = ({
  navigationItems = [],
  navigationTitle,
  navigationBtnText,
  onButtonClick = () => {}
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
              key={ path }
              path={ path }
              pageName={ pageName }
              isActive={ path === boardId }
            />
          )) }
      </ul>
      <div className="sidebar__create" onClick={ onButtonClick }>
        <img src={ iconBoard } alt="Icon board" />
        <span>
          +
          {' '}
          { navigationBtnText }
        </span>
      </div>
    </div>
  );
};
