import React, { useContext } from "react";
import StoreContext from "../store";
import "./Lists.sass";
import SingleList from "./SingleList";

function Lists() {
  const store = useContext(StoreContext);
  const lists = store.lists;

  return (
    <div className="lists">
      {lists !== undefined &&
        lists.length !== 0 &&
        lists.map((list) => {
          return <SingleList list={list} />;
        })}
    </div>
  );
}

export default Lists;
