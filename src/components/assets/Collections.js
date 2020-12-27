import React from "react";
import CollectionItem from "./CollectionItem.js";
import "./Collections.js";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Collections(props) {
  const { collections } = props;

  const onDragEnd = (result) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="1">
        {(provided) => (
          <div
            style={{ width: "90%" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {collections &&
              collections.map((item, index) => {
                return (
                  <CollectionItem
                    handleDelete={props.handleDelete}
                    handleCollectionChange={props.handleCollectionChange}
                    key={item.id}
                    item={item}
                    index={index}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Collections;
