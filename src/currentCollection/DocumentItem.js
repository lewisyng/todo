import React, { useContext, useState } from "react";
import "./DocumentItem.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { getLists, updateDone } from "../localbaseFunctions";
import StoreContext from "../store";
import { deleteItem } from "../localbaseFunctions";

function DocumentItem(props) {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;

  const { item, list } = props;
  const [hover, setHover] = useState(false);

  const toggleDone = async () => {
    await updateDone(currentCollection, list.id, item.id, !item.done);
    store.setLists(await getLists(currentCollection));
  };

  const handleDelete = async () => {
    await deleteItem(currentCollection, list.id, item.id);
    store.setLists(await getLists(currentCollection));
  };

  return (
    <div
      className={`documentItem ${!item.done ? item.priority : ""}`}
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
          className={`documentItem__actions__settings ${hover ? "hover" : ""}`}
          onClick={() =>
            store.setCurrentItemInSettings({ item: item, list: list })
          }
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
  );
}

export default DocumentItem;
