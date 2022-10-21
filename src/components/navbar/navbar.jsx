import { useState, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cn from 'classnames';

import { NavbarBtnGroup } from "./navbar-btn-group";
import { themeSliceSelector } from '../../features/themeSlice';
import { boardsSelector } from "../../features/boardsSlice";

import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';

export const Navbar = ({ sidebarVisible, className }) => {
  const darkMode = useSelector(themeSliceSelector);
  const boards = useSelector(boardsSelector);
  const { boardId } = useParams();

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--hidden-sidebar': !sidebarVisible
  });

  const pageTitle = useMemo(() => {
    if (!boardId) {
      return 'Home';
    } else {
      const currentBoard = boards.filter(({ id }) => id === boardId);
      const [ activeBoard ] = currentBoard;

      return activeBoard?.pageName;
    }
  }, [ boardId, boards ]);

  return (
    <header className={ _className }>
      <div className={ headerLogoClassName }>
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2 className="header__informative-title">{ pageTitle }</h2>
        <NavbarBtnGroup />
      </div>
    </header>
  );
};
