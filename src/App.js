import React from "react";
import { AppProvider } from "./context/AppContext";
import Nav from "./components/navBar/nav";
import Loading from "./components/loading/loading";
import MuiTable from "./components/table/table";
import Error from "./components/error/error";
import "./app.css";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <div className="navbar">
          <Nav />
        </div>
        <div className="content">
          <Loading />
          <MuiTable />
          <Error />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
