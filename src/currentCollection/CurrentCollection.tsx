import React, { FunctionComponent, useRef, useState } from "react";
import styles from "./CurrentCollection.module.sass";
import List from "../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../store/actions";
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
    <div className={styles.currentCollection}>
      <div className={styles.currentCollection__lists}>
        {state.currentCollection?.map((list: any) => {
          return <List list={list} />;
        })}

        <div className={styles.lists__newList}>
          {!showNewItemField ? (
            <Button
              className={styles.listsNewList__button}
              onClick={() => setShowNewItemField(true)}
            >
              +
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
    </div>
  );
};

export default CurrentCollection;
