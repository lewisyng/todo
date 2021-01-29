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
  const [collections, setCollections] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null)
  const [lists, setLists] = useState(null);
  const [items, setItems] = useState([]);

  const data = {
    collections: collections,
    currentCollection: currentCollection,
    lists: lists,
    items: items,

    setCollections: (data) => setCollections(data),
    setCurrentCollection: (data) => setCurrentCollection(data),
    setLists: (data) => setLists(data),
    setItems: (data) => setItems(data),

    initCollections: async () => {
      await getCollections().then((data) => {
        setCollections(data);
        console.log("dataaaa", data)
        if (data.length) {
          setCurrentCollection(data[0]["name"]);
        }
      });
    },

    setNewItemData: async () => {
      await getItems(lists).then((data) => {
        setItems(data);
      });
    },
  };

  useEffect(() => {
    if (lists) {
      data.setNewItemData();
    }
  }, [lists]);

  return (
    <UIProvider>
      <StoreContext.Provider value={data}>{children}</StoreContext.Provider>
    </UIProvider>
  );
}

export default StoreContext;
