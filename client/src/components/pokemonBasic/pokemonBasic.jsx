import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../actions/actions";

import "./pokemonBasic.css";

export default function PokemonBasic({ index }) {
  const pokemons = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemons.length < 40) {
      dispatch(getAllPokemons());
    }
  }, [pokemons]);

  if (pokemons.length > 0) {
    return (
      <div className="pokemonbasic">
        {pokemons[index].name}
        <img src={pokemons[index].img} alt="" />
        <p>
          Tipo:{" "}
          {pokemons[index].type2
            ? `${pokemons[index].type1} - ${pokemons[index].type2} `
            : pokemons[index].type1}
        </p>
      </div>
    );
  }

  return <div>loading</div>;
}
