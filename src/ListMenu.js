import React, { useState, useEffect, useContext } from "react";
import "./ListMenu.sass";
import Button from "./components/assets/AddButton";
import StoreContext from "./store";
import ListMenuItem from "./ListMenuItem";
import { useSelector } from "react-redux";

function ListMenu() {
  // const store = useContext(StoreContext);
  // const collectionList = store.collectionList;

  const state = useSelector(state => state)

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".listsButton")) {
        setMenuOpen(true);
        return;
      }
      setMenuOpen(false);
    });
    // store.initCollections();
  }, []);

  return (
    <div className="listMenu">
      <span className="listsButton">
        <Button value="Deine Listen" />
      </span>
      <ul
        className="listMenu__menu"
        style={{ display: menuOpen ? "block" : "none" }}
      >
        {/* {collectionList !== null && collectionList.length !== 0 ? (
          collectionList.map((item) => {
            return <ListMenuItem item={item} />;
          }) */}
        {state.collections?.length ? (
          state.collections.map((item) => {
            return <ListMenuItem item={item} />;
          })
        ) : (
          <li className="listMenuItem">
            <div>Keine Listen</div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ListMenu;
