import React, { useContext, useState } from "react";
import './ItemDetails.sass'
import { createNewItem } from "../../localbaseFunctions";
import StoreContext from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCollection } from ",,/../store/store";
import { setCurrentCollection } from "../../store/actions";

export function ItemDetails(props) {
  const { list } = props;

  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const [data, setData] = useState({
    name: "",
    description: "",
    priority: "low",
    subtasks: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNewItem(state.currentCollectionName, list, data);

    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });

    props.handleClose();
  };

  return (
    <div className="itemDetails">
      <form className="itemDetails__form" onSubmit={handleSubmit}>
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

        <div className="itemDetails__form__actions">
          <button className="btn" type="submit">
            Sichern
          </button>
          <button
            className="btn"
            onClick={props.handleClose}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemDetails;
