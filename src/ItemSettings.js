import React, { useContext, useState } from "react";
import "./ItemSettings.sass";
import { updateItem } from "./localbaseFunctions";
import StoreContext from "./store";

function ItemSettings(props) {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;
  const { item } = props;

  const [itemData, setItemData] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
    priority: item.priority,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(currentCollection, itemData);
    store.setNewItemData();
    props.closeSettings();
  };

  return (
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
          <option disabled selected hidden>
            Priority
          </option>
          <option value="green">Low</option>
          <option value="orange">Medium</option>
          <option value="red">High</option>
        </select>
        <div className="itemSettings__form__actions">
          <button className="btn btn__add" type="submit">
            Sichern
          </button>
          <button
            className="btn btn__add"
            type="submit"
            onClick={props.closeSettings}
          >
            Schließen
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemSettings;
