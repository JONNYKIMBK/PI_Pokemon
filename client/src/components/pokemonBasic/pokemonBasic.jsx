import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./pokemonBasic.css";

export default function PokemonBasic({ index }) {
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  if (pokemons.allPokemons.length > 0) {
    return (
      <div className="pokemonbasic">
        <input
          className="nameButton"
          type="button"
          value={
            pokemons.allPokemons[index].name.charAt(0).toUpperCase() +
            pokemons.allPokemons[index].name.slice(1)
          }
        />
        <img src={pokemons.allPokemons[index].img} alt="" />
        <p>
          Type:{" "}
          {pokemons.allPokemons[index].type2
            ? `${pokemons.allPokemons[index].type1} - ${pokemons.allPokemons[index].type2} `
            : pokemons.allPokemons[index].type1}
        </p>
      </div>
    );
  }

  return <div>loading</div>;
}
