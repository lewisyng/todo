import React, { useContext, useState } from "react";
import { createNewItem, deleteList, getLists } from "../localbaseFunctions";
import StoreContext from "../store";
import DocumentItem from "./DocumentItem";
import NewItemField from "./NewItemField";
import "./SingleList.sass";
import NewDetailedItem from "../NewDetailedItem";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

function SingleList(props) {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [showNewDetailedItem, setShowNewDetailedItem] = useState(false);
  const { list } = props;

  const createNewTodo = async (e, value) => {
    e.preventDefault();

    await createNewItem(currentCollection, list, value);
    store.setLists(await getLists(currentCollection));
    setShowNewItemField(false);
  };

  const handleListDelete = async () => {
    await deleteList(currentCollection, list.id);
    store.setLists(await getLists(currentCollection))
  }

  return (
    <div className="singleList">
      <div className="singleList__header">
        <div className="singleList__header__name">{list.name}</div>
        <div className="singleList__header__actions">
        <IconButton
        className="listMenuItem__delete"
        onClick={handleListDelete}
      >
        <DeleteIcon />
      </IconButton>
        </div>
      </div>
      {!showNewItemField && (
        <>
          <button
            className="btn btn__add currentCollection__add"
            onClick={() => setShowNewItemField(true)}
          >
            Schnell-Eintrag
          </button>
          <button
            className="btn btn__add currentCollection__add"
            onClick={() => setShowNewDetailedItem(true)}
          >
            Detail-Eintrag
          </button>
        </>
      )}
      <div className="singleList__list">
        {showNewItemField && (
          <NewItemField
            createNewTodo={createNewTodo}
            list={list}
            handleClose={() => setShowNewItemField(false)}
          />
        )}
        {list.todos.map((item, i) => {
          return <DocumentItem key={i} list={list} item={item} />;
        })}
      </div>
      <NewDetailedItem
        open={showNewDetailedItem}
        setShowNewDetailedItem={(data) => setShowNewDetailedItem(data)}
        list={list}
      />
    </div>
  );
}

export default SingleList;
