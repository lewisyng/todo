import './NewItemButton.css';
import { Button } from "@material-ui/core";
import React from "react";

function NewItemButton(props) {
  const { children, color } = props;
  return (
    <Button
      color={color}
      variant="contained"
      onClick={props.toggleNewItemField}
      style={{position: "static"}}
    >
      {children}
    </Button>
  );
}

export default NewItemButton;
