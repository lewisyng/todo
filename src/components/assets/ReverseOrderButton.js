import { Button } from "@material-ui/core";
import React from "react";

function ReverseOrderButton(props) {
  const { children } = props;

  return (
    <Button
      color="default"
      variant="contained"
      onClick={props.reverseOrder}
    >
      {children}
    </Button>
  );
}

export default ReverseOrderButton;
