import React, { useEffect, useState } from "react";
import "./SelectedTable.sass";
import db from "../localbase";
import NewItemButton from "../components/assets/NewItemButton";
import NewItemField from "./NewItemField";
import DocumentItem from "./DocumentItem";
import AddIcon from "@material-ui/icons/Add";

function SelectedTable(props) {
  const [showNewItemField, setShowNewItemField] = useState(false);
  const { selectedTable } = props;
  const [items, setItems] = useState();

  useEffect(() => {
    if (selectedTable) {
      getItems();
    }
  }, [selectedTable]);

  const getItems = async () => {
    let items = await db.collection(selectedTable).get();
    setItems(items);
  };

  const toggleNewItemField = (show) => {
    setShowNewItemField(show);
  };

  const createNewField = async (e, value) => {
    e.preventDefault();

    let arr = [];

    await db
      .collection(selectedTable)
      .get()
      .then((data) => {
        data.forEach((item) => {
          arr.push(item.id);
        });
      });

    await db.collection(selectedTable).add({
      id: arr[arr.length - 1] + 1 || 0,
      name: value,
      done: false,
    });

    getItems();
    toggleNewItemField(false);
  };

  const handleDelete = async (id) => {
    await db.collection(selectedTable).doc({ id: id }).delete();

    getItems();
  };

  const toggleCheckbox = async (id, done) => {
    if (done) {
      await db.collection(selectedTable).doc({ id: id }).update({
        done: false,
      });
    } else {
      await db.collection(selectedTable).doc({ id: id }).update({
        done: true,
      });
    }

    getItems();
  };

  return (
    <div className="selectedTable">
      {selectedTable && (
        <>
          <div className="selectedTable__header">{selectedTable}</div>
          <div className="selectedTableList">
            {items && (
              <ul>
                {items.map((item) => {
                  return (
                    <DocumentItem
                      toggleCheckbox={toggleCheckbox}
                      handleDelete={handleDelete}
                      item={item}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}

      {showNewItemField && (
        <NewItemField
          handleClick={() => toggleNewItemField(false)}
          createNewField={createNewField}
        />
      )}

      <NewItemButton
        toggleNewItemField={() => toggleNewItemField(true)}
        color="primary"
      >
        <AddIcon style={{ color: "white" }} />
      </NewItemButton>
    </div>
  );
}

export default SelectedTable;
