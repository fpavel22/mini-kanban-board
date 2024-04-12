import cn from 'classnames';

import { Button } from '@components/ui';
import { SidebarNavigation } from '@components/sidebar/sidebar-navigation';
import { SidebarToggle } from '@components/sidebar/sidebar-toggle';

import iconShowSidebar from '@/assets/icon-show-sidebar.svg';

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
        size="lg"
        darkMode={ darkMode }
        className={ showSidebarBtnClassName }
        onClick={ showSidebar }
      >
        <img src={ iconShowSidebar } alt="Show sidebar icon" />
      </Button>
    </>
  );
};
