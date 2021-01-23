import React, { useState } from "react";
import "./DocumentItem.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import ItemSettings from "../ItemSettings";
import { updateDone } from "../localbaseFunctions";

function DocumentItem(props) {
  const { item, selectedList } = props;
  const [hover, setHover] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDone = async () => {
    await updateDone(selectedList, item.id, !item.done);
    props.handleUpdateDone();
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
            onClick={() => props.handleDelete(item.id)}
          >
            <DeleteIcon color="primary" />
          </span>
        </div>
      </div>
      {settingsOpen && (
        <ItemSettings
          item={item}
          selectedList={selectedList}
          updateItem={props.updateItem}
          closeSettings={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}

export default DocumentItem;
