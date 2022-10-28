import { createContext, useState, useMemo } from 'react';

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [ sidebarVisible, setSidebarVisible ] = useState(true);

  const contextValue = useMemo(
    () => ({ sidebarVisible, setSidebarVisible }),
    [ sidebarVisible, setSidebarVisible ]
  );

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
};
