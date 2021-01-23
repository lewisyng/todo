import React, { useState } from "react";
import "./ItemSettings.sass";
import { updateItem } from "./localbaseFunctions";

function ItemSettings(props) {
  const { item, selectedList } = props;

  const [itemData, setItemData] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
    priority: item.priority,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateItem(selectedList, itemData);

    setItemData({
      name: "",
      description: "",
      priority: "",
    });

    props.updateItem();
    props.closeSettings();
  };

  return (
    <div className="itemSettings">
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
          <button type="submit">SUBMIT</button>
          <button onClick={props.closeSettings}>CLOSE</button>
        </div>
      </form>
    </div>
  );
}

export default ItemSettings;
