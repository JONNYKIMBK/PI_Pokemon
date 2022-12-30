import React from "react";
import PokemonBasic from "../pokemonBasic/pokemonBasic";

import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div>
        <PokemonBasic />
      </div>
    </div>
  );
}
