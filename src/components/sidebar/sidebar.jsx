import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '@/features/themeSlice';
import { Button } from '@components/button';
import { SidebarNavigation } from '@components/sidebar/sidebar-navigation';
import { SidebarToggle } from '@components/sidebar/sidebar-toggle';
import { useConsumeContext } from '@/hooks';

import iconShowSidebar from '@/assets/icon-show-sidebar.svg';

export const Sidebar = () => {
  const darkMode = useSelector(themeSliceSelector);
  const { sidebarVisible, setSidebarVisible } = useConsumeContext();

  const _className = cn('sidebar', {
    'sidebar--d-mode': darkMode,
    'sidebar--hidden': !sidebarVisible,
  });

  const showSidebarBtnClassName = cn('btn--show-sidebar', {
    'btn--show-sidebar--hidden': sidebarVisible
  });

  function showSidebar() {
    setSidebarVisible(true);
  }

  return (
    <>
      <aside className={ _className }>
        <SidebarNavigation />
        <SidebarToggle darkMode={ darkMode } />
      </aside>
      <Button
        className={ showSidebarBtnClassName }
        variety="primary"
        size="lg"
        onClick={ showSidebar }
      >
        <img src={ iconShowSidebar } alt="Show sidebar icon" />
      </Button>
    </>
  );
};
