import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./pokemonBasic.css";

export default function PokemonBasic({ index }) {
  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const idPokemon = pokemons.allPokemons[index].id;

  if (pokemons.searchPokemon === "no se encontro el pokemon") {
    return <div>no se encontro</div>;
  }

  if (pokemons.allPokemons.length > 0) {
    return (
      <div className="pokemonbasic">
        <NavLink to={`/home/${idPokemon}`}>
          <input
            className="nameButton"
            type="button"
            value={
              pokemons.allPokemons[index].name.charAt(0).toUpperCase() +
              pokemons.allPokemons[index].name.slice(1)
            }
          />
        </NavLink>
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
