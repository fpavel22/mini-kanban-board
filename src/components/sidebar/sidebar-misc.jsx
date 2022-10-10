import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { enableDarkTheme, enableLightTheme } from '../../features/themeSlice';
import { Button } from '../button';
import iconDarkTheme from '../../assets/icon-dark-theme.svg';
import iconLightTheme from '../../assets/icon-light-theme.svg';
import hideSidebar from '../../assets/icon-hide-sidebar.svg';

export const SidebarMisc = ({ darkMode, setSidebarVisible }) => {
  const dispatch = useDispatch();

  const togglerClassName = cn('sidebar__theme-toggler', {
    'sidebar__theme-toggler--dark': darkMode
  });

  const sliderClassName = cn('theme__slider', {
    'theme__slider--d-mode': darkMode
  });

  function toggleTheme() {
    if (darkMode) {
      dispatch(enableLightTheme());
    } else {
      dispatch(enableDarkTheme());
    }
  }

  function handleClick() {
    setSidebarVisible(false);
  }

  return (
    <div className="sidebar__misc">
      <div className={ togglerClassName }>
        <img src={ iconLightTheme } alt="Light theme icon" />
        <span className={ sliderClassName } onClick={ toggleTheme } />
        <img src={ iconDarkTheme } alt="Dark theme icon" />
      </div>
      <div className="sidebar__toggler" onClick={ handleClick }>
        <img src={ hideSidebar } alt="Hide sidebar icon" />
        <span>Hide sidebar</span>
      </div>
    </div>
  );
}
