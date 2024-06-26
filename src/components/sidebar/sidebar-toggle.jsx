import iconDarkTheme from '@/assets/icon-dark-theme.svg';
import iconLightTheme from '@/assets/icon-light-theme.svg';
import iconHideSidebar from '@/assets/icon-hide-sidebar.svg';

export const SidebarToggle = ({ hideSidebar = () => {}, toggleTheme = () => {} }) => (
  <div className="sidebar__toggle">
    <div className="theme__toggle-wrapper">
      <img src={ iconLightTheme } alt="Light theme icon" />
      <span className="theme__slider" onClick={ toggleTheme } />
      <img src={ iconDarkTheme } alt="Dark theme icon" />
    </div>
    <div className="sidebar--visibility-toggle" onClick={ hideSidebar }>
      <img src={ iconHideSidebar } alt="Hide sidebar icon" />
      <span>Hide sidebar</span>
    </div>
  </div>
);
