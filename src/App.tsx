import React from "react";

import Navbar from "./components/Navbar";
import CryptoTable from "./components/Table";
import TableTabs from "./components/TableTabs";

function App() {
  return (
    <div>
      <Navbar />
      <TableTabs />
      <CryptoTable />
    </div>
  );
}

export default App;
