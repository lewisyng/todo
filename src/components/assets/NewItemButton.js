import './NewItemButton.css';
import React from "react";

function NewItemButton(props) {
  const { children } = props;
  return (
    <button
      onClick={props.toggleNewItemField}
      className="newItemButton"
    >
      {children}
    </button>
  );
}

export default NewItemButton;
