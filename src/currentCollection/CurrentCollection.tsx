import React, { FunctionComponent, useRef, useState } from "react";
import "./CurrentCollection.sass";
import List from "../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../store/actions";
import ScrollContainer from "react-indiana-drag-scroll";
import Button from "src/components/ui/Button";

const CurrentCollection: FunctionComponent = () => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [showNewItemField, setShowNewItemField] = useState(false);
  const newListInput = useRef<HTMLInputElement>(null);

  const createNewList: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent
  ) => {
    if (newListInput) {
      e.preventDefault();
      dispatch(
        createList(state.currentCollectionName, newListInput.current?.value)
      );
      setShowNewItemField(false);
    }
  };

  return (
    <ScrollContainer
      className="currentCollection"
      ignoreElements="input, .singleList, .currentCollection__header"
    >
      <div className="currentCollection__lists">
        {state.currentCollection?.map((list: any) => {
          return <List list={list} />;
        })}

        <div className="lists__newList">
          {!showNewItemField ? (
            <Button onClick={() => setShowNewItemField(true)}>
              Neue Liste
            </Button>
          ) : (
            <form
              onSubmit={createNewList}
              onBlur={() => setShowNewItemField(false)}
            >
              <input autoFocus ref={newListInput} type="text" />
            </form>
          )}
        </div>
      </div>
    </ScrollContainer>
  );
};

export default CurrentCollection;
