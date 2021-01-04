import React, { useState } from "react";
import "./CollectionItem.css";
import { ListItem, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ForwardIcon from "@material-ui/icons/Forward";
import { Draggable } from "react-beautiful-dnd";
import { deleteCollection } from "../localbaseFunctions";

function CollectionItem(props) {
  const { item, index } = props;
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <Draggable draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="collectionItem"
          onMouseOver={() => setOptionsVisible(true)}
          onMouseOut={() => setOptionsVisible(false)}
        >
          <ListItem>
            <div className="collectionName">{item.name}</div>

            <IconButton
              id={`collectionItem__delete${item.id}`}
              className="collectionItem__deleteButton"
              style={{ visibility: optionsVisible ? "visible" : "hidden" }}
              onClick={async () => {
                await deleteCollection(index, item.name);
                props.handleDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              id={`collectionItem__show${item.id}`}
              className="collectionItem__showButton"
              style={{ visibility: optionsVisible ? "visible" : "hidden" }}
              onClick={() => props.handleCollectionChange(item.name)}
            >
              <ForwardIcon />
            </IconButton>
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}

export default CollectionItem;
