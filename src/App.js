import { useState } from "react";
import "./App.sass";
import Header from "./Header";
import Main from "./components/Main";
import Footer from "./Footer";

function App() {
  const [selectedList, setSelectedList] = useState(null);

  const handleListSelect = (id) => {
    setSelectedList(id);
  };

  return (
    <div className="app">
      <Header handleSelectedList={handleListSelect} />
      <Main selectedList={selectedList} />
      <Footer />
    </div>
  );
}

export default App;
