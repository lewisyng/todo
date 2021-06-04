import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCollection } from "../../store/actions";
import { getCurrentCollection } from "../../store/store";
import { createNewItem, createNewSubtask } from "../../localbaseFunctions";
import "./NewStandardItem.sass";

export function NewStandardItem(props) {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    priority: "low",
    subtasks: [],
  });

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { list, type = "task", item } = props;

  const createNew = async (e) => {
    e.preventDefault();

    if (type === "subtask") {
      await createNewSubtask(state.currentCollectionName, list, item, newItem);
    } else {
      await createNewItem(state.currentCollectionName, list, newItem);
    }
    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });
    props.handleClose();
  };

  return (
    <div className="newStandardItem" onBlur={props.handleClose}>
      <form
        className="newStandardItemForm"
        onSubmit={(e) => {
          createNew(e);
        }}
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
      </form>
    </div>
  );
}

export default NewStandardItem;
