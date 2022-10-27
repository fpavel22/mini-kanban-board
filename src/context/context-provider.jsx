import { createContext, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [ sidebarVisible, setSidebarVisible ] = useState(false);

  const contextValue = {
    sidebarVisible,
    setSidebarVisible
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}
