import React, { useState } from "react";
import cs from "classnames";
import styles from "./NewCollectionAction.module.sass";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewCollection, getCollections } from "src/localbaseFunctions";
import { setCollections } from "src/store/actions";
import AddIcon from "@mui/icons-material/Add";

export const NewCollectionAction = () => {
  const [userInput, setUserInput] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const dispatch = useDispatch();

  const createNewCollection = async (e: React.FormEvent) => {
    e.preventDefault();

    let tableNameAlreadyExists = await checkIfTableNameAlreadyExists(userInput);

    if (tableNameAlreadyExists) {
      alert("Der Name existiert bereits");
    } else if (userInput === "") {
      alert("Bitten geben Sie einen Namen für die Liste an!");
    } else {
      let latestID = await getLatestID();
      await addNewCollection(latestID, userInput);

      await getCollections().then((data) => {
        dispatch(setCollections(data));
      });
    }
    setDialogIsOpen(false);
    setUserInput("");
  };

  const checkIfTableNameAlreadyExists = async (name: string) => {
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
    await getCollections().then((collections) => {
      if (!collections.length) return;
      for (let collection of collections) {
        if (collection.id > latestID) latestID = collection.id;
      }
    });
    return latestID + 1;
  };
  return (
    <div className={cs(styles.NewCollectionAction, styles.action)}>
      <IconButton onClick={() => setDialogIsOpen((prev: any) => !prev)}>
        <AddIcon />
      </IconButton>

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
        <Button onClick={() => setDialogIsOpen(false)}>Create</Button>
      </Dialog>
    </div>
  );
};

export default NewCollectionAction;
