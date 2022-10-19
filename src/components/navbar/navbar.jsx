import { useSelector } from "react-redux";
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { NavbarBtnGroup } from "./navbar-btn-group";

import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';

export const Navbar = ({ sidebarVisible, className }) => {
  const darkMode = useSelector(themeSliceSelector);

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
        <h2 className="header__informative-title">Platform Launch</h2>
        <NavbarBtnGroup />
      </div>
    </header>
  );
};
