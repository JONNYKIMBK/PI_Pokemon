import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import "./pokemonBasic.css";

import { imgType } from "../pokemonDetails/pokemonDetails";

export default function PokemonBasic({ index }) {
  const [background, setBackground] = useState(false);

  const pokemons = useSelector((state) => state);

  const idPokemon = pokemons.showPokemons[index].id;

  const backgroundChange = () => {
    setBackground(!background);
  };

  if (pokemons.searchPokemon === "no se encontro el pokemon") {
    return <div>no se encontro</div>;
  }

  if (pokemons.showPokemons.length > 0 && pokemons.showPokemons[0].id) {
    return (
      <div
        className={background ? "pokemonbasic2" : "pokemonbasic"}
        onMouseOver={backgroundChange}
        onMouseOut={backgroundChange}
      >
        <NavLink to={`/home/${idPokemon}`}>
          <input
            className="nameButton"
            type="button"
            value={
              pokemons.showPokemons[index].name.charAt(0).toUpperCase() +
              pokemons.showPokemons[index].name.slice(1)
            }
          />
          <img src={pokemons.showPokemons[index].img} alt="" />
        </NavLink>
        <div className="type">
          <div
            className={
              pokemons.showPokemons[index].type1 ? "type1" : "typeNull"
            }
          >
            <img src={imgType[pokemons.showPokemons[index].type1]} />
            {pokemons.showPokemons[index].type1}
          </div>

          <div
            className={
              pokemons.showPokemons[index].type2 ? "type2" : "typeNull"
            }
          >
            <img src={imgType[pokemons.showPokemons[index].type2]} />
            {pokemons.showPokemons[index].type2}
          </div>
        </div>
      </div>
    );
  }

  return <div>loading</div>;
}
