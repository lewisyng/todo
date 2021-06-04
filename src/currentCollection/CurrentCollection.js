import React, { useState } from "react";
import "./CurrentCollection.sass";
import { addNewList } from "../localbaseFunctions";
import List from "components/list/List";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCollection } from "../store/store";
import { setCurrentCollection } from "../store/actions";
import ScrollContainer from "react-indiana-drag-scroll";

function CurrentCollection() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState(null);
  const [showNewItemField, setShowNewItemField] = useState(false);

  const createNewList = async (e) => {
    e.preventDefault();

    await addNewList(state.currentCollectionName, userInput);
    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });
    setUserInput(null);
    setShowNewItemField(false);
  };

  return (
    <div className="currentCollection">
      <ScrollContainer ignoreElements="input, .singleList, .currentCollection__header">
        <div className="currentCollection__lists">
          {state.currentCollection?.map((list) => {
            return <List list={list} />;
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
          {/* {store.settingsOpen && <ItemSettings />} */}
        </div>
      </ScrollContainer>
      {/* {store.settingsOpen && <ItemSettings />} */}
    </div>
  );
}

export default CurrentCollection;
