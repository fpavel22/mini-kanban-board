import cn from "classnames";
import { useSelector } from "react-redux";

import { themeSliceSelector } from "../../features/themeSlice";
import { Button } from "../button";
import { SidebarBoards } from "./sidebar-boards";
import { SidebarMisc } from "./sidebar-misc";

import showSidebar from "../../assets/icon-show-sidebar.svg";
import "./sidebar.scss";

export const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
  const darkMode = useSelector(themeSliceSelector);

  const _className = cn("sidebar", {
    "sidebar--d-mode": darkMode,
    "sidebar--hidden": !sidebarVisible,
  });

  const showSidebarBtnClassName = cn('btn--show-sidebar', {
    'btn--show-sidebar--hidden': sidebarVisible
  });

  return (
    <>
      <aside className={_className}>
        <SidebarBoards />
        <SidebarMisc darkMode={darkMode} setSidebarVisible={ setSidebarVisible } />
      </aside>
      <Button className={ showSidebarBtnClassName }
          type="primary"
          size="lg"
          onClick={ () => setSidebarVisible(true) }>
        <img src={showSidebar} alt="Show sidebar icon" />
      </Button>
    </>
  );
};
