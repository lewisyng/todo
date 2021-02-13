import React, { useContext, useState } from "react";
import "./CurrentCollection.sass";
import { addNewList } from "../localbaseFunctions";
import StoreContext from "../store";
import Lists from "./Lists";

function CurrentCollection() {
  const store = useContext(StoreContext);
  const currentCollection = store.currentCollection;
  const [userInput, setUserInput] = useState(null)
  const [showNewItemField, setShowNewItemField] = useState(false);

  const createNewList = async (e) => {
    e.preventDefault();

    await addNewList(currentCollection, userInput);
    store.updateLists();
    setUserInput(null)
    setShowNewItemField(false);
  };

  return (
    currentCollection && (
      <div className="currentCollection">
        <div className="currentCollection__header">{currentCollection}</div>
        <div className="currentCollection__lists">
          <Lists />
          <button
            className="btn btn__add currentCollection__add"
            onClick={() => setShowNewItemField(true)}
          >
            Neue Liste
          </button>
          {showNewItemField && (
            <div className="currentCollection__list">
              <form onSubmit={createNewList}>
                <input value={userInput} onChange={event => setUserInput(event.target.value)} type="text" />
              </form>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default CurrentCollection;
