import React, { useState } from "react";
import "./Item.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { updateDone } from "../../localbaseFunctions";
import { deleteItem } from "../../localbaseFunctions";
import { NewStandardItem } from "components/newItem";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCollection } from "../../store/store";
import { setCurrentCollection } from "../../store/actions";

export function Item(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { type, item, list } = props;
  const [hover, setHover] = useState(false);
  const [newSubtaskField, setNewSubtaskField] = useState(false);

  const toggleDone = async () => {
    await updateDone(state.currentCollectionName, list.id, item.id, !item.done);
    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });
  };

  const handleDelete = async () => {
    await deleteItem(state.currentCollectionName, list.id, item.id);
    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });
  };

  return (
    <>
      <div
        className={`item ${!item.done ? item.priority : ""} ${type}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="item__content" onClick={toggleDone}>
          <div className="item__content__name">{item.name}</div>
          <div className="item__content__description">{item.description}</div>
        </div>
        <div className="item__actions">
          <div
            className={`item__actions__settings ${hover ? "hover" : ""}`}
            // onClick={() =>
            //   store.setCurrentItemInSettings({ item: item, list: list })
            // }
          >
            <SettingsIcon color="primary" />
          </div>
          <div
            className={`item__actions__delete ${hover ? "hover" : ""}`}
            onClick={handleDelete}
          >
            <DeleteIcon color="primary" />
          </div>
          {type !== "subtask" && (
            <div
              className={`item__actions__subtask ${hover ? "hover" : ""}`}
              onClick={() => {
                setNewSubtaskField(!newSubtaskField);
              }}
            >
              <AddIcon color="primary" />
            </div>
          )}
        </div>
      </div>
      {newSubtaskField && (
        <NewStandardItem
          type="subtask"
          list={list}
          item={item}
          handleClose={() => setNewSubtaskField(false)}
        />
      )}
    </>
  );
}

export default Item;
