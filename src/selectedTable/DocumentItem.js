import { Checkbox, ListItemSecondaryAction, IconButton, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import "./DocumentItem.css";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

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
    <div className="documentItem">
      <div
        className="documentItem__listItem"
        onMouseOver={showOptions}
        onMouseOut={hideOptions}
      >
        <ListItem
          button
          style={{ backgroundColor: item.done ? "green" : "red" }}
          onClick={() => props.toggleCheckbox(item.id, item.done)}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.done}
              style={{color: 'white'}}
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              id={`documentItem__delete${item.id}`}
              style={{ visibility: "hidden" }}
              onClick={() => props.handleDelete(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    </div>
  );
}

export default DocumentItem;
