import { IconButton } from "@material-ui/core";
import "./DocumentItem.sass";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Button from "../components/Button";

function DocumentItem(props) {
  const { item } = props;

  const showOptions = () => {
    document.getElementById(`documentItem__delete${item.id}`).style.visibility =
      "visible";
  };

  const hideOptions = () => {
    document.getElementById(`documentItem__delete${item.id}`).style.visibility =
      "hidden";
  };

  return (
    <li>
      <div
        className="documentItem"
        onMouseOver={showOptions}
        onMouseOut={hideOptions}
        style={{ backgroundColor: item.done ? "green" : "red" }}
      >
        <div
          className="documentItem__content"
          onClick={() => props.toggleCheckbox(item.id, item.done)}
        >
          <div className="documentItem__done">
            {item.done ? (
              <CheckBoxIcon style={{ color: "white" }} />
            ) : (
              <CheckBoxOutlineBlankIcon style={{ color: "white" }} />
            )}
          </div>
          <div className="documentItem__name">{item.name}</div>
        </div>
        <IconButton
          className="documentItem__delete"
          id={`documentItem__delete${item.id}`}
          onClick={() => props.handleDelete(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </li>
  );
}

export default DocumentItem;
