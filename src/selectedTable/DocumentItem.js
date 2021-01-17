import React, { useState } from "react";
import "./DocumentItem.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteButton from "../components/assets/DeleteButton";

function DocumentItem(props) {
  const { item } = props;
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`documentItem ${item.done ? "done" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
      <span
        className={`documentItem__delete ${hover ? "hover" : ""}`}
        onClick={() => props.handleDelete(item.id)}
      >
        <DeleteButton value={<DeleteIcon />} />
      </span>
    </div>
  );
}

export default DocumentItem;
