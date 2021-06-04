import React, { useState } from "react";
import "./List.sass";
import { deleteList } from "../../localbaseFunctions";
import Item from "../item/Item";
import NewStandardItem from "../newItem/NewStandardItem";
import NewDetailedItem from "../newItem/NewDetailedItem";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCollection } from "../../store/store";
import { setCurrentCollection } from "../../store/actions";

function List({ list }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [showNewDetailedItem, setShowNewDetailedItem] = useState(false);

  const handleListDelete = async () => {
    await deleteList(state.currentCollectionName, list.id);
    await getCurrentCollection(state.currentCollectionName).then((data) => {
      dispatch(setCurrentCollection(data));
    });
  };

  return (
    <div className="list">
      <div className="list__header">
        <div className="list__header__name">{list.name}</div>
        <div className="list__header__actions">
          <IconButton
            className="listMenuItem__delete"
            onClick={handleListDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {!showNewItemField && (
        <div className="list__newItem">
          <button
            className="btn currentCollection__add"
            onClick={() => setShowNewItemField(true)}
          >
            Schnell-Eintrag
          </button>
          <button
            className="btn currentCollection__add"
            onClick={() => setShowNewDetailedItem(true)}
          >
            Detail-Eintrag
          </button>
        </div>
      )}
      <div className="list__list">
        {showNewItemField && (
          <NewStandardItem
            list={list}
            handleClose={() => setShowNewItemField(false)}
          />
        )}
        {list.todos.map((item, i) => {
          return (
            <>
              <Item type="task" key={i} list={list} item={item} />
              {item.subtasks.map((subtask) => {
                return <Item type="subtask" list={list} item={subtask} />;
              })}
            </>
          );
        })}
      </div>
      <NewDetailedItem
        open={showNewDetailedItem}
        handleClose={() => setShowNewDetailedItem(false)}
        list={list}
      />
    </div>
  );
}

export default List;
