import React, { FunctionComponent, useState } from "react";
import { Modal } from "@material-ui/core";
import "./NewDetailedItem.sass";
import { ListType } from "lib/types";
import { useDispatch, useSelector } from "react-redux";
import { createNewDetailedTodo } from "src/store/actions";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

type Props = {
  open: boolean;
  list: ListType;
  handleClose: () => void;
};

export const NewDetailedItem: FunctionComponent<Props> = ({
  open,
  list,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [newItemData, setNewItemData] = useState<{
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
  }>({
    name: "",
    description: "",
    priority: "low",
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="newDetailedItem">
        <Heading>Neuer Eintrag</Heading>
        <form
          className="newDetailedItem__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              createNewDetailedTodo(
                store.currentCollectionName,
                list,
                newItemData
              )
            );
            handleClose();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={newItemData.name}
            onChange={(event) =>
              setNewItemData({
                ...newItemData,
                name: event.target.value,
              })
            }
          />

          <label htmlFor="description">Beschreibung</label>
          <input
            autoComplete="off"
            type="text"
            name="description"
            value={newItemData.description}
            onChange={(event) =>
              setNewItemData({
                ...newItemData,
                description: event.target.value,
              })
            }
          />
          <label htmlFor="Priority">Priorität</label>
          <select
            name="Priority"
            className="priority"
            value={newItemData.priority}
            onChange={(event) =>
              setNewItemData({
                ...newItemData,
                priority: event.target.value as "low" | "medium" | "high",
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="newDetailedItem__form__actions">
            <Button type="submit">Sichern</Button>
            <Button onClick={handleClose}>Schließen</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewDetailedItem;
