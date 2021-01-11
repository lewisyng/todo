import React, { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem.js";
import "./Collections.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { List } from "@material-ui/core";

function Collections(props) {
  const [collections, setCollections] = useState();
  const { colls } = props;

  useEffect(() => {
    if (colls) {
      setCollections(colls);
    }
  }, [colls]);

  const persistNewOrderOfCollections = () => {
    
  }

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!result.destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const results = Array.from(collections);
    const [removed] = results.splice(source.index, 1);
    results.splice(destination.index, 0, removed);

    setCollections(results);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <div
            className="collections"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <List>
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
            </List>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Collections;
