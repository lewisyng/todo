import React, { createContext, useEffect, useState } from "react";
import { getCollections, getItems } from "./localbaseFunctions";

const StoreContext = createContext({});
const UIContext = createContext({});

export function UIProvider({ children }) {
  const [netItemFieldIsOpen, setNewItemFieldIsOpen] = useState();
  
  const uiValue = {
    newItemFieldIsOpen: false
  };

  return <UIContext.Provider value={uiValue}>{children}</UIContext.Provider>;
}

export function StoreProvider({ children }) {
  const [lists, setLists] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [items, setItems] = useState([]);

  const data = {
    lists: lists,
    currentList: currentList,
    items: items,

    setLists: (data) => setLists(data),
    setCurrentList: (data) => setCurrentList(data),
    setItems: (data) => setItems(data),

    setNewCollectionData: async () => {
      await getCollections().then((data) => {
        setLists(data);
        if (data.length) {
          setCurrentList(data[0]["name"]);
        } else {
          setCurrentList(null);
        }
      });
    },

    setNewItemData: async () => {
      await getItems(currentList).then((data) => {
        setItems(data);
      });
    },
  };

  useEffect(() => {
    if (currentList) {
      data.setNewItemData();
    }
  }, [currentList]);

  return (
    <UIProvider>
      <StoreContext.Provider value={data}>{children}</StoreContext.Provider>
    </UIProvider>
  );
}

export default StoreContext;
