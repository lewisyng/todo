import { useState } from "react";
import "./App.sass";
import Header from "./Header";
import Main from "./components/Main";
import Footer from "./Footer";
import { StoreProvider } from "./store";
import {useStore} from './store';

function App() {
  const [selectedList, setSelectedList] = useState(null);

  return (
    <StoreProvider>
      <div className="app">
        <Header
          handleSelectedList={(nameOfSelectedList) => {
            setSelectedList(nameOfSelectedList);
          }}
        />
        {/* <Main selectedList={selectedList} /> */}
        <Main />
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
