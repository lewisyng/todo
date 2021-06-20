import React, { FunctionComponent, useState } from "react";
import { Modal } from "@material-ui/core";
import "./NewDetailedItem.sass";
import { ListType } from "lib/types";
import { useDispatch, useSelector } from "react-redux";
import { createNewDetailedTodo } from "src/store/actions";
import Heading from "../ui/Heading";

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

  const [newItemData, setNewItemData] = useState({
    name: "",
    description: "",
    priority: "low",
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="newDetailedItem">
        <Heading color="#000">Neuer Eintrag</Heading>
        <div className="itemDetails">
          <div className="itemSettings__header">Einstellungen</div>
          <form
            className="itemSettings__form"
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
                  priority: event.target.value,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="itemSettings__form__actions">
              <button className="btn btn__add" type="submit">
                Sichern
              </button>
              <button className="btn btn__add" onClick={handleClose}>
                Schließen
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default NewDetailedItem;
