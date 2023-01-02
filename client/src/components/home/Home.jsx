import PokemonBasic from "../pokemonBasic/pokemonBasic";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../actions/actions";

import "./Home.css";

export default function Home() {
  const pokemons = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemons.length < 40) {
      dispatch(getAllPokemons());
    }
  }, [pokemons]);

  return (
    <div className="home">
      <div className="pokemons">
        {pokemons.map((pokemon, index) => (
          <PokemonBasic index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
