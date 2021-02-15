import React, { createContext, useEffect, useState } from "react";
import { getCollections, getLists } from "./localbaseFunctions";

const StoreContext = createContext({});

export function StoreProvider({ children }) {
  const [collectionList, setCollectionList] = useState(null);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [lists, setLists] = useState([]);

  const [settingsOpen, setSettingOpen] = useState(false);
  const [currentItemInSettings, setCurrentItemInSettings] = useState(null);

  const data = {
    collectionList: collectionList,
    currentCollection: currentCollection,
    lists: lists,

    settingsOpen: settingsOpen,
    currentItemInSettings: currentItemInSettings,

    setCollectionsList: (data) => setCollectionList(data),
    setCurrentCollection: (data) => setCurrentCollection(data),
    setLists: (data) => setLists(data),

    setSettingsOpen: (data) => setSettingOpen(data),
    setCurrentItemInSettings: (data) => setCurrentItemInSettings(data),

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
    },
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

  useEffect(() => {
    if (currentItemInSettings) {
      if (currentItemInSettings) {
        data.setSettingsOpen(true);
      } else {
        data.setSettingsOpen(false);
      }
    }
  }, [currentItemInSettings]);

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}

export default StoreContext;
