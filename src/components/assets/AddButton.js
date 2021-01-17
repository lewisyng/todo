import React from "react";
import "./AddButton.sass";

function AddButton(props) {
  const { value } = props;

  return <button className="customButton">{value}</button>;
}

export default AddButton;
