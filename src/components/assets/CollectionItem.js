import React from "react";
import "./CollectionItem.css";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ForwardIcon from "@material-ui/icons/Forward";
import { Draggable } from "react-beautiful-dnd";

function CollectionItem(props) {
  const { item, index } = props;

  const showOptions = () => {
    document.getElementById(
      `collectionItem__delete${item.id}`
    ).style.visibility = "visible";
    document.getElementById(`collectionItem__show${item.id}`).style.visibility =
      "visible";
  };

  const hideOptions = () => {
    document.getElementById(
      `collectionItem__delete${item.id}`
    ).style.visibility = "hidden";
    document.getElementById(`collectionItem__show${item.id}`).style.visibility =
      "hidden";
  };

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="collectionItem"
          onMouseOver={showOptions}
          onMouseOut={hideOptions}
        >
          <div className="collectionName">{item.name}</div>
          <Button
            id={`collectionItem__delete${item.id}`}
            className="collectionItem__deleteButton"
            style={{ visibility: "hidden" }}
            onClick={() => props.handleDelete(item.id, item.name)}
          >
            <DeleteIcon />
          </Button>
          <Button
            id={`collectionItem__show${item.id}`}
            className="collectionItem__showButton"
            style={{ visibility: "hidden" }}
            onClick={() => props.handleCollectionChange(item.name)}
          >
            <ForwardIcon />
          </Button>
        </div>
      )}
    </Draggable>
  );
}

export default CollectionItem;
