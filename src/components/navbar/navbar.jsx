import { useSelector, useDispatch } from "react-redux";
import cn from 'classnames';

import { Button } from '../button';
import { themeSliceSelector } from '../../features/themeSlice';
import { displayModal } from '../../features/showAddTaskModalSlice';

import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import './navbar.scss';

export const Navbar = ({ sidebarVisible, className, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--border-bottom': !sidebarVisible
  });

  function showCardModal() {
    dispatch(displayModal());
  }

  return (
    <header { ...props } className={ _className }>
      <div className={ headerLogoClassName }>
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2 className="header__informative-title">Platform Launch</h2>
        <Button type="primary" size="lg" onClick={ showCardModal }>+ Add New Task</Button>
      </div>
    </header>
  );
}
