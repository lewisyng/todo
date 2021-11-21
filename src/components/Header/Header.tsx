import {FunctionComponent} from "react";
import NewList from "../NewList/NewList";
import ListMenu from "../ListMenu/ListMenu";
import styles from "./Header.module.sass";

const Header: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__actions}>
        <div className={styles.headerActions__smallScreen}>
          <ListMenu />
          <NewList />
        </div>
      </div>
    </div>
  );
}

export default Header;
