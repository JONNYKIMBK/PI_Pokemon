import React from "react";
import { Route } from "react-router-dom";
import Landingpage from "./components/landingPage/Landingpage";
import Home from "./components/home/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landingpage />
      </Route>

      <Route path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
