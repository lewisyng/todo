import { FunctionComponent } from "react";
import styles from "./Main.module.sass";
import CurrentCollection from "../../currentCollection/CurrentCollection";
import Sidebar from "../Sidebar/Sidebar";

const Main: FunctionComponent = () => {
  return (
    <div className={styles.main}>
      {/* <Sidebar />

      <Header />
      <CurrentCollection /> */}
    </div>
  );
};

export default Main;
