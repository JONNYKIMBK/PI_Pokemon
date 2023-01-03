import PokemonBasic from "../pokemonBasic/pokemonBasic";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../actions/actions";

import "./Home.css";

export default function Home() {
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemons.allPokemons.length < 40) {
      dispatch(getAllPokemons());
      dispatch(getTypes());
    }
  }, [pokemons]);

  return (
    <div className="home">
      <div className="pokemons">
        {pokemons.allPokemons.map((pokemon, index) => (
          <PokemonBasic index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
