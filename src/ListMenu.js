import React, { useState, useEffect } from "react";
import "./ListMenu.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "./components/assets/AddButton";
import { IconButton } from "@material-ui/core";
import {deleteCollection} from './localbaseFunctions';

function ListMenu(props) {
  const { collections } = props;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".listsButton")) {
        setMenuOpen(true);
        return;
      }
      setMenuOpen(false);
    });
  }, []);

  const handleCollectionDelete = async (name) => {
    await deleteCollection(name);
    props.handleCollectionDelete();
  }

  return (
    <div className="listMenu">
      <span className="listsButton">
        <Button value="Deine Listen" />
      </span>
      <ul
        className="listMenu__menu"
        style={{ display: menuOpen ? "block" : "none" }}
      >
        {collections !== null && collections.length !== 0 ? (
          collections.map((item) => {
            return (
              <li
                className="listMenu__item"
                onClick={() => {
                  props.handleSelectedList(item.name);
                }}
              >
                <div className="listMenu__item__name">{item.name}</div>
                <IconButton onClick={() => handleCollectionDelete(item.name)} className="listMenu__item__delete">
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })
        ) : (
          <li className="listMenu__item">
            <div>Keine Listen</div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ListMenu;
