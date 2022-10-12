import { useSelector } from "react-redux";
import cn from "classnames";

import { themeSliceSelector } from "../../features/themeSlice";
import { Button } from "../button";
import { SidebarBoards } from "./sidebar-boards";
import { SidebarMisc } from "./sidebar-misc";

import iconShowSidebar from "../../assets/icon-show-sidebar.svg";
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

  function showSidebar() {
    setSidebarVisible(true);
  }

  return (
    <>
      <aside className={ _className }>
        <SidebarBoards />
        <SidebarMisc darkMode={ darkMode } setSidebarVisible={ setSidebarVisible } />
      </aside>
      <Button className={ showSidebarBtnClassName }
          type="primary"
          size="lg"
          onClick={ showSidebar }>
        <img src={ iconShowSidebar } alt="Show sidebar icon" />
      </Button>
    </>
  );
};
