import React, { useContext } from "react";
import { getItems } from "../localbaseFunctions";
import StoreContext from "../store";
import DocumentItem from "./DocumentItem";
import "./Lists.sass";
import SingleList from './SingleList'

function Lists() {
  // const store = useContext(StoreContext);
  // const lists = store.lists;
  // const items = store.items;
  // const currentCollection = store.currentList;

  return (
    <div className="lists">
        {/* <SingleList /> */}
    </div>
  );
}

export default Lists;
