import React from "react";
import "./Main.sass";
import SelectedList from "../selectedList/SelectedList";

function Main(/*props*/) {
  // const {selectedList} = props;

  return (
    <div className="main">
      <SelectedList /*selectedList={selectedList}*/ />
    </div>
  );
}

export default Main;
