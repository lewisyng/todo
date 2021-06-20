import { FunctionComponent } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import "./NewList.sass";
import { addNewCollection, getCollections } from "../../localbaseFunctions";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../../store/actions";

const NewList: FunctionComponent = () => {
  const store = useSelector((state) => state);
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
    <div className="newList">
      <IconButton onClick={() => setDialogIsOpen((prev) => !prev)}>
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
      </Dialog>
    </div>
  );
};

export default NewList;
