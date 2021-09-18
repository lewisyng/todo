import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTodoItem } from "../../store/actions";
import "./NewStandardItem.sass";
import { ListType } from "lib/types";

type Props = {
  list: ListType;
  handleClose: () => void;
};

export const NewStandardItem: FunctionComponent<Props> = ({
  list,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    name: "",
    description: ""
  });

  return (
    <div className="newStandardItem" onBlur={handleClose}>
      <form
        className="newStandardItemForm"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createNewTodoItem(
              store.currentCollectionName,
              list,
              newItem,
            )
          );
          handleClose();
        }}
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          value={newItem.name}
          onChange={(e) => {
            setNewItem({ ...newItem, name: e.target.value });
          }}
        />
      </form>
    </div>
  );
};

export default NewStandardItem;
