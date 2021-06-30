import { FunctionComponent } from "react";
import "./App.sass";
import Header from "../Header/Header";
import Main from "../main/Main";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUp } from "../../store/actions";

const App: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUp());
  }, []);

  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
};

export default App;
