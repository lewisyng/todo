import "./App.sass";
import { Header, Footer } from "../shared";
import { Main } from "../main";
import { StoreProvider } from "../../store";
import { store } from "../../store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import db from "../../localbase";
import {
  setCollections,
  setCurrentCollection,
  setCurrentCollectionName,
} from "../../store/actions";
import { getCollections, getCurrentCollection } from "../../store/store";

export function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await getCollections().then(async (data) => {
        if (data) {
          dispatch(setCollections(data));
          dispatch(setCurrentCollectionName(data[0].name));
          await getCurrentCollection(data[0].name).then((data) => {
            dispatch(setCurrentCollection(data));
            console.log("new5", data);
          });
        }
      });
    })();
  }, []);

  return (
    <div className="app">
      {/* <StoreProvider> */}
      <Header />
      <Main />
      <Footer />
      {/* </StoreProvider> */}
    </div>
  );
}

export default App;
