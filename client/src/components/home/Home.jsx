import PokemonBasic from "../pokemonBasic/pokemonBasic";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

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
