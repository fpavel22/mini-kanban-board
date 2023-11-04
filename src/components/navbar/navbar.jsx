import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { NavbarBtnGroup } from '@components/navbar/navbar-btn-group';
import { allBoardsSelector, boardsStatusSelector } from '@/features/boardsSlice';
import { themeSliceSelector } from '@/features/themeSlice';
import { useConsumeContext } from '@/hooks';
import { THUNK_STATUS } from '@/constants';

import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';

export const Navbar = ({ className }) => {
  const darkMode = useSelector(themeSliceSelector);
  const boards = useSelector(allBoardsSelector);
  const boardsStatus = useSelector(boardsStatusSelector);

  const { sidebarVisible } = useConsumeContext();

  const { boardId } = useParams();

  const _className = cn('header', {
    'header--d-mode': darkMode
  }, className);

  const headerLogoClassName = cn('header__logo', {
    'header__logo--hidden-sidebar': !sidebarVisible
  });

  const pageTitle = () => {
    switch (boardsStatus) {
      case THUNK_STATUS.LOADING:
        return 'Loading...';
      case THUNK_STATUS.SUCCEEDED:
        return boards.filter(({ id }) => id === boardId)[ 0 ]?.pageName;
      default:
        return '';
    }
  };

  return (
    <header className={ _className }>
      <div className={ headerLogoClassName }>
        <img src={ darkMode ? logoLight : logoDark } alt="Header logo" />
      </div>
      <div className="header__informative">
        <h2 className="header__informative-title">{ pageTitle() }</h2>
        <NavbarBtnGroup />
      </div>
    </header>
  );
};
