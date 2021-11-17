import { FunctionComponent } from "react";
import styles from "./App.module.sass";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUp } from "../../store/actions";
import Sidebar from "../Sidebar/Sidebar";
import CurrentCollection from "../../currentCollection/CurrentCollection";

const App: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUp());
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.main}>
        <Header />
        <CurrentCollection />
      </div>
    </div>
  );
};

export default App;
