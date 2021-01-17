import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import db from "../localbase";
import NewItemField from "../selectedTable/NewItemField";
import {
  getCollections,
  overwriteCollections,
} from "../localbaseFunctions";
import Collections from "./Collections";

function Sidebar(props) {
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [collections, setCollections] = useState();

  useEffect(() => {
    (async () => {
      setCollections(await getCollections());
    })();
  }, []);

  const createNewCollection = async (e, value) => {
    e.preventDefault();

    let tableNameAlreadyExists = await checkIfTableNameAlreadyExists(value);

    if (tableNameAlreadyExists) {
      alert("Der Name existiert bereits");
    } else if (value === "") {
      alert("Bitten geben Sie einen Namen für die Liste an!");
    } else {
      let latestID = await getLatestID();
      await addNewCollection(latestID, value);
      iniateNewCollection(value);
      changeTable();

      setShowNewItemField(false);
      setCollections(await getCollections());
    }
  };

  const checkIfTableNameAlreadyExists = async (name) => {
    let collections = await getCollections();

    if (collections.length === 0) return false;

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].name === name) {
        return true;
      }
    }

    return false;
  };

  const iniateNewCollection = async (collection) => {
    await db.collection(collection).get();
  };

  const getLatestID = async () => {
    let latestID = 0;
    let collections = await getCollections();
    if (collections.length === 0) return latestID;
    for (let i = 0; i < collections.length; i++) {
      if (collections[i].id > latestID) latestID = collections[i].id;
    }
    return latestID;
  };

  const addNewCollection = async (latestID, value) => {
    let collections = await getCollections();

    collections.unshift({
      id: latestID + 1,
      name: value,
    });

    overwriteCollections(collections);
  };

  const changeTable = async () => {
    const collectionList = await db.collection("collections").get();
    props.handleCollectionChange(collectionList.data[0].name);
  };

  const reverseOrderOfCollections = async () => {
    let collections = await getCollections();
    let reverseCollections = collections.reverse();

    setCollections(reverseCollections);
    overwriteCollections(reverseCollections);
  };

  // useEffect(() => {
  //   (async () => {
  //     setCollections(await getCollections())
  //   })();
  // }, [orderOfCollections])

  return (
    <div className="sidebar">
      <div className="sidebarActions">
        <div className="sidebar__newListBtn">
          {/* <NewItemButton
            color="default"
            toggleNewItemField={() => setShowNewItemField(true)}
          >
            <AddIcon />
          </NewItemButton> */}
        </div>

        <div className="sidebar__reverseOrder">
          {/* <ReverseOrderButton reverseOrder={reverseOrderOfCollections}>
            <ImportExportIcon />
          </ReverseOrderButton> */}
        </div>
      </div>

      {showNewItemField && (
        <NewItemField
          handleClick={() => setShowNewItemField(false)}
          createNewField={createNewCollection}
        />
      )}
      <Collections
        handleDelete={async () => {
          setCollections(await getCollections());
          props.handleCollectionChange(null);
        }}
        handleCollectionChange={props.handleCollectionChange}
        colls={collections}
      />
    </div>
  );
}

export default Sidebar;
