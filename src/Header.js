import React from "react";
import "./Header.sass";
import NewList from "./NewList";
import ListMenu from "./ListMenu";

function Header() {
  return (
    <div className="header">
      <div className="header__actions">
        <ListMenu />
        <NewList />
      </div>
      <div className="logo">TODOS</div>
    </div>
  );
}

export default Header;
