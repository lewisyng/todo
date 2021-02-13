import React, { useContext, useEffect, useState } from "react";
import { createNewItem, getItems, getLists } from "../localbaseFunctions";
import StoreContext from "../store";
import CurrentCollection from "./CurrentCollection";
import DocumentItem from "./DocumentItem";
import NewItemField from "./NewItemField";
import "./SingleList.sass";
import AddIcon from "@material-ui/icons/Add";

function SingleList(props) {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;
  const [showNewItemField, setShowNewItemField] = useState(false);
  const { list } = props;

  const createNewTodo = async (e, value) => {
    e.preventDefault();

    await createNewItem(currentCollection, list, value);
    store.setLists(await getLists(currentCollection))
    setShowNewItemField(false);
  };

  return (
    <div className="singleList">
      <div className="singleList__name">{list.name}</div>
      <button
        className="btn btn__add currentCollection__add"
        onClick={() => setShowNewItemField(true)}
      >
        <AddIcon />
      </button>
      {showNewItemField && (
        <div className="currentCollection__list">
          <NewItemField
            toggleNewItemField={() => setShowNewItemField(false)}
            createNewTodo={createNewTodo}
          />
        </div>
      )}
      {

      }
      {list.todos.map((item, i) => {
        return <DocumentItem key={i} list={list} item={item} />;
      })}
    </div>
  );
}

export default SingleList;
