import cn from 'classnames';

import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';
import { NavbarBtnGroup } from './navbar-btn-group';

export const Navbar = ({
  darkMode,
  navbarTitle,
  sidebarVisible,
  className,
  ...restProps
}) => {
  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--hidden-sidebar': !sidebarVisible
  });

  return (
    <header className={ _className }>
      <div className={ headerLogoClassName }>
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2 className="header__informative-title">{ navbarTitle }</h2>
        <NavbarBtnGroup { ...restProps } darkMode={ darkMode } />
      </div>
    </header>
  );
};
