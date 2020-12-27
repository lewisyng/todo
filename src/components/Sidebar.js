import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import db from "../localbase";
import NewItemField from "./assets/NewItemField";
import { deleteCollection, deleteItem } from "../localbaseFunctions";
import NewItemButton from "./assets/NewItemButton";
import Collections from "./assets/Collections";

function Sidebar(props) {
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [collections, setCollections] = useState();

  useEffect(() => {
      (async () => {
        setCollections(await getCollections()); 
      })();
  }, [])

  const getCollections = async () => {
    return await db.collection('collections').get();
  }

  const createNewCollection = async (e, value) => {
    e.preventDefault();

    if(value === "") return;

    let exists = await checkIfTableNameAlreadyExists(value)

    if(!exists){
        let latestID = await getLatestID();
        await addNewCollection(latestID, value);
        iniateNewCollection(value);
        changeTable();
    
        setShowNewItemField(false);
        setCollections(await getCollections());
    } else {
        alert('Der Name existiert bereits')
    }

  };

  const checkIfTableNameAlreadyExists = async (name) => {
    let collections = await db.collection('collections').get();

    for(let i = 0; i < collections.length; i++){
        if(collections[i].name === name){
            return true;
        }
    }
    
    return false;
  }

  const iniateNewCollection = async (collection) => {
    await db.collection(collection).get();
  };

  const getLatestID = async () => {
    let latestID;
    await db
      .collection("collections")
      .get()
      .then((data) => {
        data.length ? (latestID = data[data.length - 1].id) : (latestID = -1);
      });
    return latestID;
  };

  const addNewCollection = async (latestID, value) => {
    await db.collection("collections").add({
      id: latestID + 1,
      name: value,
    });
  };

  const changeTable = async () => {
    const collectionList = await db.collection("collections").get();
    props.handleCollectionChange(
      collectionList[collectionList.length - 1].name
    );
  };

  const handleDelete = async (id, collection) => {
    await deleteCollection(collection);
    await deleteItem("collections", id);
    setCollections(await getCollections())
  };

  return (
    <div className="sidebar">
      <Collections
        handleDelete={handleDelete}
        handleCollectionChange={props.handleCollectionChange}
        collections={collections}
      />
      <NewItemButton
        value="Neue Liste"
        className="sidebar__newList"
        toggleNewItemField={() => setShowNewItemField(true)}
      />

      {showNewItemField && (
        <NewItemField
          handleClick={() => setShowNewItemField(false)}
          createNewField={createNewCollection}
        />
      )}
    </div>
  );
}

export default Sidebar;
