import { createContext, useState } from 'react';

export const SidebarVisibleContext = createContext(null);
export const SidebarToggleContext = createContext(null);

export const SidebarContext = ({ children }) => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  return (
    <SidebarToggleContext.Provider value={ setSidebarVisible }>
      <SidebarVisibleContext.Provider value={ sidebarVisible }>
        { children }
      </SidebarVisibleContext.Provider>
    </SidebarToggleContext.Provider>
  );
};
