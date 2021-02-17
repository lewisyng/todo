import React, { useContext, useState } from "react";
import { createNewItem, getLists } from "./localbaseFunctions";
import StoreContext from "./store";

function ItemDetails(props) {
  const store = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    description: "",
    priority: "low",
    subtasks: [],
  });
  const { list } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNewItem(store.currentCollection, list, data);
    store.setLists(await getLists(store.currentCollection));
    props.closeItemSettings(false);
  };

  return (
    <div className="itemDetails">
      <form className="itemSettings__form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          value={data.name}
          onChange={(event) => setData({ ...data, name: event.target.value })}
        />

        <label htmlFor="description">Beschreibung</label>
        <input
          autoComplete="off"
          type="text"
          name="description"
          value={data.description}
          onChange={(event) =>
            setData({ ...data, description: event.target.value })
          }
        />
        <label htmlFor="Priority">Priorität</label>
        <select
          name="Priority"
          className="priority"
          defaultValue="def"
          value={data.priority}
          onChange={(event) =>
            setData({ ...data, priority: event.target.value })
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
          <button
            className="btn btn__add"
            type="submit"
            onClick={props.closeItemSettings}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemDetails;
