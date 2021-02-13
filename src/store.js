import React, { createContext, useEffect, useState } from "react";
import { getCollections, getItems, getLists } from "./localbaseFunctions";

const StoreContext = createContext({});

export function StoreProvider({ children }) {
  const [collectionList, setCollectionList] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [lists, setLists] = useState([]);

  const data = {
    collectionList: collectionList,
    currentCollection: currentCollection,
    lists: lists,

    setCollectionsList: (data) => setCollectionList(data),
    setCurrentCollection: (data) => setCurrentCollection(data),
    setLists: (data) => setLists(data),

    initCollections: async () => {
      await getCollections().then((data) => {
        setCollectionList(data);
        if (data.length) {
          setCurrentCollection(data[data.length - 1].name);
        } else {
          setCurrentCollection(null);
        }
      });
    },
    updateLists: async () => {
      setLists(await getLists(currentCollection));
    }
  };

  useEffect(() => {
    (async () => {
      setCollectionList(await getCollections());
    })();
  }, []);

  useEffect(() => {
    if (currentCollection) {
      (async () => {
        setLists(await getLists(currentCollection));
      })();
    }
  }, [currentCollection]);

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}

export default StoreContext;
