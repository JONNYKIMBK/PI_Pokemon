import React from "react";
import { Route } from "react-router-dom";
import Homepage from "./components/homepage/Landingpage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Homepage />
      </Route>
    </div>
  );
}

export default App;
