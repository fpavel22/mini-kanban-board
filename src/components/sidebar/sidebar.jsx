import cn from 'classnames';

import iconShowSidebar from '@/assets/icon-show-sidebar.svg';
import { SIZE } from '@/constants';
import { Button } from '../button';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarToggle } from './sidebar-toggle';

export const Sidebar = ({
  darkMode,
  sidebarVisible,
  showSidebar = () => {},
  ...restProps
}) => {
  const _className = cn('sidebar', {
    'sidebar--d-mode': darkMode,
    'sidebar--hidden': !sidebarVisible,
  });

  const showSidebarBtnClassName = cn('btn--show-sidebar', {
    'btn--show-sidebar--hidden': sidebarVisible
  });

  return (
    <>
      <aside className={ _className }>
        <SidebarNavigation { ...restProps } />
        <SidebarToggle { ...restProps } />
      </aside>
      <Button
        variety="primary"
        size={ SIZE.LG }
        darkMode={ darkMode }
        className={ showSidebarBtnClassName }
        onClick={ showSidebar }
      >
        <img src={ iconShowSidebar } alt="Show sidebar icon" />
      </Button>
    </>
  );
};
