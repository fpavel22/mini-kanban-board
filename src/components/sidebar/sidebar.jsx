import cn from 'classnames';

import iconShowSidebar from '@/assets/icon-show-sidebar.svg';
import { BUTTON_VARIETIES, SIZE } from '@/constants';

import { Button } from '../button';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarToggle } from './sidebar-toggle';

import './sidebar.scss';

export const Sidebar = ({
  darkMode,
  showSidebar,
  sidebarNavigationProps,
  sidebarToggleProps,
  sidebarVisible
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
        <SidebarNavigation { ...sidebarNavigationProps } />
        <SidebarToggle { ...sidebarToggleProps } />
      </aside>
      <Button
        className={ showSidebarBtnClassName }
        darkMode={ darkMode }
        onClick={ showSidebar }
        size={ SIZE.LG }
        variety={ BUTTON_VARIETIES.PRIMARY }
      >
        <img alt="Show sidebar icon" src={ iconShowSidebar } />
      </Button>
    </>
  );
};
