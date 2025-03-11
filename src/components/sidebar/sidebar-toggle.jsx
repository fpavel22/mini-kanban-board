import iconDarkTheme from '@/assets/icon-dark-theme.svg';
import iconLightTheme from '@/assets/icon-light-theme.svg';
import iconHideSidebar from '@/assets/icon-hide-sidebar.svg';

export const SidebarToggle = ({ hideSidebar, toggleTheme }) => (
  <div className="sidebar__toggle">
    <div className="theme__toggle-wrapper">
      <img alt="Light theme icon" src={ iconLightTheme } />
      <span className="theme__slider" onClick={ toggleTheme } />
      <img alt="Dark theme icon" src={ iconDarkTheme } />
    </div>
    <div className="sidebar--visibility-toggle" onClick={ hideSidebar }>
      <img alt="Hide sidebar icon" src={ iconHideSidebar } />
      <span>Hide sidebar</span>
    </div>
  </div>
);
