import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import Landingpage from "./components/landingPage/Landingpage";
import Home from "./components/home/Home";
import NavBar from "./components/NavBar/navBar";

//styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landingpage />
      </Route>

      <Route path="/home">
        <NavBar />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>
    </div>
  );
}

export default App;
