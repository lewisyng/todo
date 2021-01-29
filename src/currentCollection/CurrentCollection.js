import React, { useContext, useState } from "react";
import "./CurrentCollection.sass";
import NewItemField from "./NewItemField";
import DocumentItem from "./DocumentItem";
import AddIcon from "@material-ui/icons/Add";
import { createNewItem, getItems } from "../localbaseFunctions";
import StoreContext from "../store";
import Lists from "./Lists";

function CurrentCollection() {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;

  const [showNewItemField, setShowNewItemField] = useState(false);

  const createNewField = async (e, value) => {
    e.preventDefault();

    await createNewItem(currentCollection, value);
    await getItems(currentCollection).then((data) => store.setItems(data));
    setShowNewItemField(false);
  };

  return (
    currentCollection && (
      <div className="currentCollection">
        <div className="currentCollection__header">{currentCollection}</div>
        <button
          className="btn btn__add currentCollection__add"
          onClick={() => setShowNewItemField(true)}
        >
          <AddIcon />
        </button>
        <div className="currentCollection__list">
          {showNewItemField && (
            <NewItemField
              toggleNewItemField={() => setShowNewItemField(false)}
              createNewField={createNewField}
            />
          )}
          <Lists />
        </div>
      </div>
    )
  );
}

export default CurrentCollection;
