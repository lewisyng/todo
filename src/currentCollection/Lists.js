import React, { useContext, useState } from "react";
import ItemSettings from "../ItemSettings";
import { addNewList } from "../localbaseFunctions";
import StoreContext from "../store.js";
import "./Lists.sass";
import SingleList from "./SingleList";

function Lists() {
  const store = useContext(StoreContext);
  const lists = store.lists;

  const [userInput, setUserInput] = useState(null);
  const [showNewItemField, setShowNewItemField] = useState(false);

  const createNewList = async (e) => {
    e.preventDefault();

    await addNewList(store.currentCollection, userInput);
    store.updateLists();
    setUserInput(null);
    setShowNewItemField(false);
  };

  return (
    <div className="lists">
      {lists !== undefined &&
        lists.length !== 0 &&
        lists.map((list) => {
          return <SingleList list={list} />;
        })}
      <div className="lists__newList">
        <button
          className="btn btn__add"
          onClick={() => setShowNewItemField(true)}
        >
          Neue Liste
        </button>
        {showNewItemField && (
          <form onSubmit={createNewList}>
            <input
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              type="text"
            />
          </form>
        )}
      </div>
      {store.settingsOpen && <ItemSettings />}
    </div>
  );
}

export default Lists;
