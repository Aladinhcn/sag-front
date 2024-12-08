import React, { createContext, useContext } from "react";
import { useAppState } from "../hooks/appState";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const appState = useAppState();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
