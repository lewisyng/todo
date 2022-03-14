import React, { FunctionComponent, useState } from "react";
import "./ItemSettings.sass";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "src/store/actions";
import { ListType, SubtaskType, TodoType } from "lib/types";
import { Modal } from '@mui/material';

type Props = {
  open: boolean;
  item: TodoType | SubtaskType;
  list: ListType;
  type: "task" | "subtask";
  handleClose: () => void;
};

export const ItemSettings: FunctionComponent<Props> = ({
  open,
  item,
  list,
  type,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [itemSettingsData, setItemSettingsData] = useState({
    id: item.id,
    name: item.name,
    description: item.description,
    priority: item.priority,
    ...(type === "task" && { subtasks: [] }),
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="itemSettings">
        <div className="itemSettings__header">Einstellungen</div>
        <form
          className="itemSettings__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              updateItem(
                store.currentCollectionName,
                list,
                item,
                itemSettingsData,
                type
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
            value={itemSettingsData.name}
            onChange={(event) =>
              setItemSettingsData({
                ...itemSettingsData,
                name: event.target.value,
              })
            }
          />

          <label htmlFor="description">Beschreibung</label>
          <input
            autoComplete="off"
            type="text"
            name="description"
            value={itemSettingsData.description}
            onChange={(event) =>
              setItemSettingsData({
                ...itemSettingsData,
                description: event.target.value,
              })
            }
          />
          <label htmlFor="Priority">Priorität</label>
          <select
            name="Priority"
            className="priority"
            value={itemSettingsData.priority}
            onChange={(event) =>
              setItemSettingsData({
                ...itemSettingsData,
                priority: event.target.value as "low" | "medium" | "high",
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
    </Modal>
  );
};

export default ItemSettings;
