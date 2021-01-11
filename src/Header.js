import React, { useEffect, useState } from "react";
import "./Header.css";
import { getCollections } from "./localbaseFunctions";
import NewList from "./NewList";
import ListMenu from "./ListMenu";

function Header(props) {
  const [collections, setCollections] = useState();

  useEffect(() => {
    (async () => {
      setCollections(await getCollections());
    })();
  }, []);

  return (
    <div className="header">
      <div className="header__actions">
        <ListMenu
          handleSelectedList={props.handleSelectedList}
          collections={collections}
        />
        <NewList setCollections={(data) => setCollections(data)} />
      </div>
      <div className="logo">TODOS</div>
    </div>
  );
}

export default Header;
