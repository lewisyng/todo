import React, { createContext, useContext, useReducer } from "react";
import { getCollections } from "./localbaseFunctions";

const StoreContext = createContext();
const initialState = {
  lists: [],
  currentList: null,
  currentItems: "",
};

(async () => {
  await getCollections().then((data) => {
    initialState.lists = data;
  });
})();

const reducer = (state, action) => {
  switch (action.type) {
    case "changeList":
      return {
        ...state,
        currentList: action.currentList,
      };
    case "changeItem":
      return {
        currentItem: action.currentItem,
      };
    case "updateCurrentItems":
      return {
        ...state,
        currentItems: action.currentItems,
      };
    case "updateList":
      return {};
    default:
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
