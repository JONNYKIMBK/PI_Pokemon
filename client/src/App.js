import React from "react";
import { Route } from "react-router-dom";

//components
import Landingpage from "./components/landingPage/Landingpage";
import Home from "./components/home/Home";
import NavBar from "./components/NavBar/navBar";
import PokemonDetails from "./components/pokemonDetails/pokemonDetails";
import NewPokemon from "./components/newPokemon/newPokemon";

import SocialMedia from "./components/socialMedia/socialMedia";
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
        <SocialMedia />
        <Home />
      </Route>

      <Route exact path="/home/:idPokemon">
        <PokemonDetails />
      </Route>

      <Route path="/newpokemon">
        <NewPokemon />
      </Route>
    </div>
  );
}

export default App;
