import React from "react";
import "./Main.sass";
import CurrentCollection from "../currentCollection/CurrentCollection";
import ScrollContainer from "react-indiana-drag-scroll";

function Main() {
  return (
    <ScrollContainer ignoreElements="input, .singleList, .currentCollection__header">
      <div className="main">
        <CurrentCollection />
      </div>
    </ScrollContainer>
  );
}

export default Main;
