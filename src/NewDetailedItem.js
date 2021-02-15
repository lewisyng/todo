import { Modal } from "@material-ui/core";
import React from "react";
import ItemDetails from "./ItemDetails";
import "./NewDetailedItem.sass";

function NewDetailedItem(props) {
  const { open, list } = props;

  const handleClose = () => {
    props.setShowNewDetailedItem(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="newDetailedItem">
        <h2 id="transition-modal-title">Neuer Eintrag</h2>
        <ItemDetails list={list} closeItemSettings={handleClose} />
      </div>
    </Modal>
  );
}

export default NewDetailedItem;
