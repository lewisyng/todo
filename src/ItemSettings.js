import { Modal } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./ItemSettings.sass";
import { updateItem } from "./localbaseFunctions";
import StoreContext from "./store";

function ItemSettings() {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;
  const { item, list } = store.currentItemInSettings;

  const [itemData, setItemData] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
    priority: item.priority,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(currentCollection, list.id, item.id, itemData);
    store.updateLists();
    handleClose();
  };

  const handleClose = () => {
    store.setSettingsOpen(false);
  };

  return (
    <Modal open={store.settingsOpen} onClose={handleClose}>
      <div className="itemSettings">
        <div className="itemSettings__header">Einstellungen</div>
        <form className="itemSettings__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={itemData.name}
            onChange={(event) =>
              setItemData({ ...itemData, name: event.target.value })
            }
          />

          <label htmlFor="description">Beschreibung</label>
          <input
            autoComplete="off"
            type="text"
            name="description"
            value={itemData.description}
            onChange={(event) =>
              setItemData({ ...itemData, description: event.target.value })
            }
          />
          <label htmlFor="Priority">Priorität</label>
          <select
            name="Priority"
            className="priority"
            defaultValue="def"
            value={itemData.priority}
            onChange={(event) =>
              setItemData({ ...itemData, priority: event.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="itemSettings__form__actions">
            <button className="btn btn__add" type="submit">
              Sichern
            </button>
            <button className="btn btn__add" onClick={handleClose}>
              Schließen
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ItemSettings;
