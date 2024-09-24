// src/context/StoreProvider.js

import React, { createContext, useContext } from "react";
import { authStore } from "../store/AuthStore";
import { taskStore } from "../store/TaskStore";
import { projectStore } from "../store/ProjectStore";
import { teamStore } from "../store/TeamStore";

const store = {
  authStore,
  taskStore,
  projectStore,
  teamStore,
};

const StoreContext = createContext(store);

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
