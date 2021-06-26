import {FunctionComponent} from "react";
import "./Header.sass";
import NewList from "../NewList/NewList";
import ListMenu from "../ListMenu/ListMenu";

const Header: FunctionComponent = () => {
  return (
    <div className="header">
      <div className="header__actions">
        <ListMenu />
        <NewList />
      </div>
    </div>
  );
}

export default Header;
