import { EllipsisIcon } from '../../ellipsis-icon';
import { Popup } from '../../popup';

export const NavbarBtnGroup = ({
  darkMode,
  menuOptions,
  renderButton
}) => {
  const trigger = (props) => (
    <EllipsisIcon
      { ...props }
      alt="Navbar options icon"
      className="header__btn--options"
    />
  );

  return (
    <div className="header__btn-group">
      { renderButton }
      <Popup
        darkMode={ darkMode }
        items={ menuOptions }
        trigger={ trigger }
      />
    </div>
  );
};
