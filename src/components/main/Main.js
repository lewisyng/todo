import React from "react";
import "./Main.sass";
import CurrentCollection from "../../currentCollection/CurrentCollection";
import { useSelector } from "react-redux";

export function Main() {
  const state = useSelector((state) => state);
  return (
    <div className="main">
      <div className="main__header">{state.currentCollectionName}</div>
      <CurrentCollection />
    </div>
  );
}

export default Main;
