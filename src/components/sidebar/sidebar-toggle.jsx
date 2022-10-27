import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { enableDarkTheme, enableLightTheme } from '../../features/themeSlice';
import { userSelector } from '../../features/userSlice';
import { useConsumeContext } from '../../hooks';
import { saveToLocalStorage } from '../../utils/utils';

import iconDarkTheme from '../../assets/icon-dark-theme.svg';
import iconLightTheme from '../../assets/icon-light-theme.svg';
import iconHideSidebar from '../../assets/icon-hide-sidebar.svg';

export const SidebarToggle = ({ darkMode }) => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { sidebarVisible, setSidebarVisible } = useConsumeContext();

  function toggleTheme() {
    dispatch(darkMode ? enableLightTheme() : enableDarkTheme());
  }

  function hideSidebar() {
    setSidebarVisible(false);
  }

  useEffect(() => {
    saveToLocalStorage(user.uid, darkMode, sidebarVisible);
  }, [ darkMode, sidebarVisible ]);

  return (
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
};
