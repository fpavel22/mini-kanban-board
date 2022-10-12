import iconBoard from '../../assets/icon-board.svg';
import navigationList from '../../navigationList.json';

export const SidebarNavigation = () => {
  const itemsCount = navigationList.length;

  return (
    <div className="sidebar__navigation">
      <p className="sidebar__navigation-title">All Boards ({ itemsCount })</p>
      <ul className="sidebar__navigation-items">
        { navigationList.map(({ id, name }) => (
          <li key={ id } className={ id === 1 ? 'active' : '' }>
            <img src={ iconBoard } alt="Board icon" />
            <span>{ name }</span>
          </li>
        )) }
        <li className="sidebar__create">
          <img src={ iconBoard } alt="Icon board" />
          <span>+ Create new Board</span>
        </li>
      </ul>
    </div>
  );
}
