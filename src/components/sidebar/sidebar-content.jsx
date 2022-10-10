import iconBoard from '../../assets/icon-board.svg';

export const SidebarContent = () => (
  <div className="sidebar__content">
    <p className="sidebar__content-title">All Boards (3)</p>
    <ul className="sidebar__items">
      <li className="active">
        <img src={iconBoard} alt="Icon board" />
        <span>Platform Launch</span>
      </li>
      <li>
        <img src={iconBoard} alt="Icon board" />
        <span>Marketing Plan</span>
      </li>
      <li>
        <img src={iconBoard} alt="Icon board" />
        <span>Roadmap</span>
      </li>
      <li className="sidebar__create">
        <img src={iconBoard} alt="Icon board" />
        <span>+ Create new Board</span>
      </li>
    </ul>
  </div>
);
