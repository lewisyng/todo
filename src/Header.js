import React, { useEffect, useState } from "react";
import "./Header.sass";
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

  useEffect(() => {
    if (collections && collections.length) {
      props.handleSelectedList(collections[0].name);
    } else {
      props.handleSelectedList(null)
    }
  }, [collections]);

  return (
    <div className="header">
      <div className="header__actions">
        <ListMenu
          handleSelectedList={props.handleSelectedList}
          collections={collections}
          handleCollectionDelete={async () =>
            setCollections(await getCollections())
          }
        />
        <NewList setCollections={(data) => setCollections(data)} />
      </div>
      <div className="logo">TODOS</div>
    </div>
  );
}

export default Header;
