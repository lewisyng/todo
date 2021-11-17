import {FunctionComponent} from "react";
import "./Main.sass";
import CurrentCollection from "../../currentCollection/CurrentCollection";
import { useSelector } from "react-redux";
import Heading from "../ui/Heading";

const Main: FunctionComponent = () => {
  const state = useSelector((state: any) => state);
  return (
    <div className="main">
      <Heading color="black" textAlign="center" allCaps>
        {state.currentCollectionName}
      </Heading>
      <CurrentCollection />
    </div>
  );
}

export default Main;
