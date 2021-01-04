import React, { useEffect, useState } from "react";
import "./NewItemField.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

function NewItemField(props) {
  const [newField, setNewField] = useState("");

  useEffect(() => {
    document.getElementById("inputField").focus();
  }, []);

  return (
    <div className="newItemField">
      <form
        onSubmit={(event) => {
          props.createNewField(event, newField);
          setNewField("");
        }}
        className="newItemFieldForm"
      >
        <input
          type="text"
          value={newField}
          id="inputField"
          onChange={(e) => setNewField(e.target.value)}
        />
        <Button onClick={props.handleClick}>
          <CloseIcon />
        </Button>
      </form>
    </div>
  );
}

export default NewItemField;
