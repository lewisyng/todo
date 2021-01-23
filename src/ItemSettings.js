import React, { useState } from "react";
import "./ItemSettings.sass";
import { updateItem } from "./localbaseFunctions";

function ItemSettings(props) {
  const { item, selectedList, open } = props;

  const [itemData, setItemData] = useState({
    id: item.id,
    name: "",
    description: "",
    priority: "",
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
    <div className={`itemSettings${open ? "__open" : ""}`}>
      <form
        className="itemSettings__form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={itemData.name}
          onChange={(event) =>
            setItemData({ ...itemData, name: event.target.value })
          }
        />

        <label htmlFor="description">Beschreibung</label>
        <input
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
          <button onClick={props.closeSettings}>CLOSE</button>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default ItemSettings;
