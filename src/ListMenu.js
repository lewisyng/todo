import React, { useState, useEffect, useContext } from "react";
import "./ListMenu.sass";
import Button from "./components/assets/AddButton";
import StoreContext from "./store";
import ListMenuItem from "./ListMenuItem";

function ListMenu() {
  const store = useContext(StoreContext);
  const collections = store.collections;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".listsButton")) {
        setMenuOpen(true);
        return;
      }
      setMenuOpen(false);
    });
    store.initCollections();
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
        {console.log("object", collections)}
        {collections !== null &&
        collections !== undefined &&
        collections.length !== 0 ? (
          collections.map((item) => {
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
