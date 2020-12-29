import React, { useState } from "react";
import "./Main.css";
import Sidebar from "./Sidebar";
import SelectedTable from "./SelectedTable";

function Main() {
  const [selectedTable, setSelectedTable] = useState();

  const handleCollectionChange = (id) => {
    setSelectedTable(id);
  };

  return (
    <div className="main">
      <Sidebar handleCollectionChange={handleCollectionChange} />
      {selectedTable 
        ? <SelectedTable selectedTable={selectedTable} />
        : <div>Wählen Sie eine Liste aus</div>
      }
    </div>
  );
}

export default Main;
