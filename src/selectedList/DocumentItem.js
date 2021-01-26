import React, { useContext, useState } from "react";
import "./DocumentItem.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import ItemSettings from "../ItemSettings";
import { updateDone } from "../localbaseFunctions";
import StoreContext from '../store'
import { deleteItem, getItems } from "../localbaseFunctions";

function DocumentItem(props) {
  const store = useContext(StoreContext)
  const selectedList = store.currentList;
  
  const { item } = props;
  const [hover, setHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDone = async () => {
    await updateDone(selectedList, item.id, !item.done)
    store.setNewItemData();
  };

  const handleDelete = async () => {
    await deleteItem(selectedList, item.id);
    await getItems(selectedList).then(data => store.setItems(data))
  };

  return (
    <>
      <div
        className={`documentItem ${item.done ? "done" : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="documentItem__content" onClick={toggleDone}>
          <div className="documentItem__content__name">{item.name}</div>
          <div className="documentItem__content__description">
            {item.description}
          </div>
        </div>
        <div className="documentItem__actions">
          <span
            className={`documentItem__actions__settings ${
              hover ? "hover" : ""
            }`}
            onClick={() => setSettingsOpen(true)}
          >
            <SettingsIcon color="primary" />
          </span>
          <span
            className={`documentItem__actions__delete ${hover ? "hover" : ""}`}
            onClick={handleDelete}
          >
            <DeleteIcon color="primary" />
          </span>
        </div>
      </div>
      {settingsOpen && (
        <ItemSettings
          item={item}
          updateItem={props.updateItem}
          closeSettings={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}

export default DocumentItem;
