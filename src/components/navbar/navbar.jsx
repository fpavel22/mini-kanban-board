import { useSelector, useDispatch } from "react-redux";
import cn from 'classnames';

import { Button } from '../button';
import { themeSliceSelector } from '../../features/themeSlice';
import { showAddTaskModal } from '../../features/showModalSlice';

import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import './navbar.scss';

export const Navbar = ({ sidebarVisible, className }) => {
  const darkMode = useSelector(themeSliceSelector);
  const dispatch = useDispatch();

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--hidden-sidebar': !sidebarVisible
  });

  function showCardModal() {
    dispatch(showAddTaskModal());
  }

  return (
    <header className={ _className }>
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
