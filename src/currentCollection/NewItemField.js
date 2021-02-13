import React, { useState } from "react";
import "./NewItemField.sass";

function NewItemField(props) {
  const [newField, setNewField] = useState("");

  return (
    <div className="newItemField" onBlur={props.toggleNewItemField}>
      <form
        className="newItemFieldForm"
        onSubmit={(event) => {
          props.createNewTodo(event, newField);
        }}
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NewItemField;
