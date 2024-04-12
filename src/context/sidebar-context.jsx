import { createContext, useMemo, useState } from 'react';

export const Context = createContext();

export const SidebarContext = ({ children }) => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const contextValue = useMemo(() => ({
    sidebarVisible,
    setSidebarVisible
  }), [ sidebarVisible ]);

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};
