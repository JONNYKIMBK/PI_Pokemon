import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./pokemonBasic.css";

export default function PokemonBasic({ index }) {
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const idPokemon = pokemons.pokemons[index].id;

  if (pokemons.searchPokemon === "no se encontro el pokemon") {
    return <div>no se encontro</div>;
  }

  if (pokemons.pokemons.length > 0) {
    return (
      <div className="pokemonbasic">
        <NavLink to={`/home/${idPokemon}`}>
          <input
            className="nameButton"
            type="button"
            value={
              pokemons.pokemons[index].name.charAt(0).toUpperCase() +
              pokemons.pokemons[index].name.slice(1)
            }
          />
        </NavLink>
        <img src={pokemons.pokemons[index].img} alt="" />

        <p>
          Type:{" "}
          {pokemons.pokemons[index].type2
            ? `${pokemons.pokemons[index].type1} - ${pokemons.pokemons[index].type2} `
            : pokemons.pokemons[index].type1}
        </p>
      </div>
    );
  }

  return <div>loading</div>;
}
