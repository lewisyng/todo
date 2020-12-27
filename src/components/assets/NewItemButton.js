import { Button } from "@material-ui/core";
import React from "react";

function NewItemButton(props) {
  const { value } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={props.toggleNewItemField}
    >
      {value}
    </Button>
  );
}

export default NewItemButton;
