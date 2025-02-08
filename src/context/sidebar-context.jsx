import { createContext, useContext, useState } from 'react';

export const SidebarToggleContext = createContext(null);
export const SidebarVisibleContext = createContext(null);

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

export const useSidebarToggleContext = () => {
  const context = useContext(SidebarToggleContext);

  if (context === null) {
    throw new Error('SidebarToggleContext can be used only inside its provider.');
  }

  return context;
};

export const useSidebarVisibleContext = () => {
  const context = useContext(SidebarVisibleContext);

  if (context === null) {
    throw new Error('SidebarVisibleContext can be used only inside its provider.');
  }

  return context;
};
