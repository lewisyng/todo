import { IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ListMenuItem.sass";
import StoreContext from "./store";
import { deleteCollection } from "./localbaseFunctions";

function ListMenuItem(props) {
  const store = useContext(StoreContext);
  const { item } = props;

  const handleCollectionDelete = async (name) => {
    await deleteCollection(name);
    store.initCollections();
  };

  return (
    <li className="listMenuItem">
      <div
        className="listMenuItem__name"
        onClick={() => {
          store.setCurrentCollection(item.name);
        }}
      >
        {item.name}
      </div>
      <IconButton
        className="listMenuItem__delete"
        onClick={() => handleCollectionDelete(item.name)}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}

export default ListMenuItem;
