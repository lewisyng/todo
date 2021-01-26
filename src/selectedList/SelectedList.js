import React, { useContext, useState } from "react";
import "./SelectedList.sass";
import NewItemField from "./NewItemField";
import DocumentItem from "./DocumentItem";
import AddIcon from "@material-ui/icons/Add";
import { createNewItem, getItems } from "../localbaseFunctions";
import StoreContext from "../store";

function SelectedList() {
  const store = useContext(StoreContext);
  const selectedList = store.currentList;
  const items = store.items

  const [showNewItemField, setShowNewItemField] = useState(false);

  const createNewField = async (e, value) => {
    e.preventDefault();

    await createNewItem(selectedList, value);
    await getItems(selectedList).then(data => store.setItems(data))
    setShowNewItemField(false);
  };

  return (
    selectedList && (
      <div className="selectedList">
        <div className="selectedList__header">{selectedList}</div>
        <button
          className="btn btn__add selectedList__add"
          onClick={() => setShowNewItemField(true)}
        >
          <AddIcon />
        </button>
        {showNewItemField && (
          <NewItemField
            toggleNewItemField={() => setShowNewItemField(false)}
            createNewField={createNewField}
          />
        )}
        <div className="selectedList__list">
          {items.map((item, i) => {
            return (
              <DocumentItem
                key={i}
                item={item}
                updateItem={async () => await getItems(selectedList).then(data => store.setItems(data))}
              />
            );
          })}
        </div>
      </div>
    )
  );
}

export default SelectedList;
