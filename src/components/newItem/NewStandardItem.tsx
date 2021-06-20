import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTodo } from "../../store/actions";
import "./NewStandardItem.sass";
import { ListType, TodoType } from "lib/types";

type Props = {
  list: ListType;
  type?: string;
  item?: TodoType;
  handleClose: () => void;
};

export const NewStandardItem: FunctionComponent<Props> = ({
  list,
  type,
  item,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    priority: "low",
    ...(type === "task" && { subtasks: [] }),
  });

  return (
    <div className="newStandardItem" onBlur={handleClose}>
      <form
        className="newStandardItemForm"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createNewTodo(
              store.currentCollectionName,
              list,
              item,
              newItem,
              type
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
