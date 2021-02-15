import React, { useContext, useState } from "react";
import { createNewItem, getLists } from "../localbaseFunctions";
import StoreContext from "../store";
import "./NewItemField.sass";

function NewItemField(props) {
  const store = useContext(StoreContext)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    priority: "low",
    subtasks: [],
  });
  const {list} = props;

  const createNewTodo = async (e) => {
    e.preventDefault();

    await createNewItem(store.currentCollection, list, newItem);
    store.setLists(await getLists(store.currentCollection));
    props.handleClose();
  }

  return (
    <div className="newItemField" onBlur={props.handleClose}>
      <form
        className="newItemFieldForm"
        onSubmit={(event) => {
          createNewTodo(event, );
        }}
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
        />
      </form>
      
    </div>
  );
}

export default NewItemField;
