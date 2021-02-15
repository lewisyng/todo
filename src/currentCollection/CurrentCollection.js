import React, { useContext, useState } from "react";
import "./CurrentCollection.sass";
import { addNewList } from "../localbaseFunctions";
import StoreContext from "../store";
import Lists from "./Lists";
import ItemSettings from "../ItemSettings";

function CurrentCollection() {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;

  return (
    currentCollection && (
      <div className="currentCollection">
        <div className="currentCollection__header">{currentCollection}</div>
        <div className="currentCollection__lists">
          <Lists />
        </div>
        {store.settingsOpen && <ItemSettings />}
      </div>
    )
  );
}

export default CurrentCollection;
