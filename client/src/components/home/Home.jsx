import React, { useEffect, useState } from "react";

import PokemonBasic from "../pokemonBasic/pokemonBasic";
import Filter from "../filter/filter";

import { useDispatch, useSelector } from "react-redux";
import { clear, getAllPokemons, getTypes } from "../../actions/actions";

import "./Home.css";

export default function Home() {
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const arrayPokemons = pokemons.pokemons;
  useEffect(() => {
    if (pokemons.allPokemons.length < 1) {
      dispatch(getAllPokemons());
      dispatch(getTypes());
    }

    if (pokemons.selectPokemon.id) {
      dispatch(clear());
    }
    if (pokemons.searchPokemon.id) {
      dispatch(clear());
    }
  }, [pokemons]);

  return (
    <div className="home">
      <div className="filter">
        <Filter />
      </div>

      <div className="pokemons">
        {arrayPokemons.map((pokemon, index) => (
          <PokemonBasic index={index} key={index} />
        ))}
      </div>
    </div>
  );
}
