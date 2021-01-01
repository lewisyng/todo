import React, { useState } from "react";
import "./Main.css";
import Sidebar from "../sidebar/Sidebar";
import SelectedTable from "../selectedTable/SelectedTable";

function Main() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleCollectionChange = (id) => {
    setSelectedTable(id);
  };

  return (
    <div className="main">
      <Sidebar handleCollectionChange={handleCollectionChange} />
      <SelectedTable selectedTable={selectedTable} />
    </div>
  );
}

export default Main;
