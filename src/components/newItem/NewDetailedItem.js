import { Modal } from "@material-ui/core";
import React from "react";
import ItemDetails from "../itemDefails/ItemDetails";
import "./NewDetailedItem.sass";

export function NewDetailedItem(props) {
  const { open, list } = props;

  return (
    <Modal open={open} onClose={props.handleClose}>
      <div className="newDetailedItem">
        <h2 id="transition-modal-title">Neuer Eintrag</h2>
        <ItemDetails list={list} handleClose={props.handleClose} />
      </div>
    </Modal>
  );
}

export default NewDetailedItem;
