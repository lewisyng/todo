import React, { useEffect, useState } from "react";
import "./SelectedTable.css";
import db from "../localbase";
import NewItemButton from "../components/assets/NewItemButton";
import NewItemField from "./NewItemField";
import DocumentItem from "./DocumentItem";
import { List } from "@material-ui/core";
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
      {selectedTable === null ? (
        <div className="selectATable">Wählen Sie eine Liste aus</div>
      ) : (
        <>
          <div className="selectedTable__header">{selectedTable}</div>
          <div className="selectedTableList">
            {items && (
              <List>
                {items.map((item) => {
                  return (
                    <DocumentItem
                      toggleCheckbox={toggleCheckbox}
                      handleDelete={handleDelete}
                      item={item}
                    />
                  );
                })}
              </List>
            )}
          </div>

          {showNewItemField && (
            <NewItemField
              handleClick={() => toggleNewItemField(false)}
              createNewField={createNewField}
            />
          )}

          <NewItemButton
            value="Neues Todo"
            toggleNewItemField={() => toggleNewItemField(true)}
            color="primary"
          >
            <AddIcon />
          </NewItemButton>
        </>
      )}
    </div>
  );
}

export default SelectedTable;
