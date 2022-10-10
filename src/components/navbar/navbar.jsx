import cn from 'classnames';
import { useSelector } from "react-redux";

import { Button } from '../button';
import { themeSliceSelector } from '../../features/themeSlice';
import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import './navbar.scss';

export const Navbar = ({ sidebarVisible, className, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--border-bottom': !sidebarVisible
  });

  return (
    <header { ...props } className={ _className }>
      <div className={ headerLogoClassName }>
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2>Platform Launch</h2>
        <Button type="primary" size="lg">+ Add New Task</Button>
      </div>
    </header>
  );
}
