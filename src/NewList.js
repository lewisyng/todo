import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import "./NewList.sass";
import { getCollections, overwriteCollections } from "./localbaseFunctions";
import Button from "./components/Button";
import AddIcon from "@material-ui/icons/Add";

function NewList(props) {
  const [userInput, setUserInput] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const createNewCollection = async (e) => {
    e.preventDefault();

    let tableNameAlreadyExists = await checkIfTableNameAlreadyExists(userInput);

    if (tableNameAlreadyExists) {
      alert("Der Name existiert bereits");
    } else if (userInput === "") {
      alert("Bitten geben Sie einen Namen für die Liste an!");
    } else {
      let latestID = await getLatestID();
      await addNewCollection(latestID, userInput);

      props.setCollections(await getCollections());
    }
    setDialogIsOpen(false);
    setUserInput("");
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

  return (
    <div className="newList">
      <span onClick={() => setDialogIsOpen(true)}>
        <Button value={<AddIcon />} />
      </span>

      <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
        <DialogContent>
          <form
            autoComplete="off"
            onSubmit={(event) => createNewCollection(event)}
          >
            <DialogContentText>
              Geben Sie einen Namen für Ihre Liste ein
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              onChange={(event) => setUserInput(event.target.value)}
              value={userInput}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewList;
