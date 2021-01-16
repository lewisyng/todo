import React, { useEffect, useState } from "react";
import "./Main.sass";
import Sidebar from "../sidebar/Sidebar";
import SelectedTable from "../selectedTable/SelectedTable";

function Main(props) {
  const {selectedList} = props;
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    setSelectedTable(selectedList)
  })

  return (
    <div className="main">
      {/* <Sidebar handleCollectionChange={handleCollectionChange} /> */}
      <SelectedTable selectedTable={selectedTable} />
    </div>
  );
}

export default Main;
