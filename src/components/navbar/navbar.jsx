import cn from 'classnames';
import { useSelector } from "react-redux";

import { Button } from '../button';
import { themeSliceSelector } from '../../features/themeSlice';
import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import './navbar.scss';

export const Navbar = ({ className, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  return (
    <header { ...props } className={ _className }>
      <div className="header__logo">
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2>Platform Launch</h2>
        <Button type="primary" size="lg">+ Add New Task</Button>
      </div>
    </header>
  );
}
