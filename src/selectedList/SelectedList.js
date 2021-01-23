import React, { useEffect, useState } from "react";
import "./SelectedList.sass";
import db from "../localbase";
import NewItemField from "./NewItemField";
import DocumentItem from "./DocumentItem";
import AddIcon from "@material-ui/icons/Add";
import { createNewItem, getItems } from "../localbaseFunctions";

function SelectedList(props) {
  const { selectedList } = props;
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    selectedList &&
      (async () =>
        await getItems(selectedList).then((data) => {
          setItems(data);
        }))();
  }, [selectedList]);

  const createNewField = async (e, value) => {
    e.preventDefault();

    await createNewItem(selectedList, value);

    setItems(await getItems(selectedList));
    setShowNewItemField(false);
  };

  const handleDelete = async (id) => {
    await db.collection(selectedList).doc({ id: id }).delete();
    await getItems(selectedList).then((data) => setItems(data));
  };

  return (
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
              selectedList={selectedList}
              item={item}
              handleDelete={handleDelete}
              handleUpdateDone={async () =>
                setItems(await getItems(selectedList))
              }
              updateItem={async () => setItems(await getItems(selectedList))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SelectedList;
