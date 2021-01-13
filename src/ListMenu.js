import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./ListMenu.css";
import DeleteIcon from "@material-ui/icons/Delete";

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

  return (
    <div className="listMenu">
      <Button className="listsButton" variant="contained" color="primary">
        Deine Listen
      </Button>
      <ul
        className="listMenu__menu"
        style={{ display: menuOpen ? "block" : "none" }}
      >
        {collections !== undefined && collections.length !== 0 ? (
          collections.map((item) => {
            return (
              <li
                className="listMenu__item"
                onClick={() => {
                  props.handleSelectedList(item.name);
                }}
              >
                <div className="listMenu__item__name">{item.name}</div>
                <div className="listMenu__item__delete">
                  <DeleteIcon />
                </div>
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
