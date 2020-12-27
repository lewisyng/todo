import React, { useEffect, useState } from "react";
import "./NewItemField.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";

function NewItemField(props) {
  const [newList, setNewList] = useState();

  useEffect(() => {
    document.getElementById("inputField").focus();
  }, []);

  return (
    <div className="newItemField">
      <form
        onSubmit={(event) => {
          props.createNewField(event, newList);
          setNewList("");
        }}
        className="newItemFieldForm"
      >
        <input
          type="text"
          value={newList}
          id="inputField"
          onChange={(e) => setNewList(e.target.value)}
        />
        <Button onClick={props.handleClick}>
          <CloseIcon />
        </Button>
      </form>
    </div>
  );
}

export default NewItemField;
