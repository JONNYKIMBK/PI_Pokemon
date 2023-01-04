import React, { useEffect, useState } from "react";
import { getAllPokemons, getById, getTypes } from "../../actions/actions";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./pokemonDetails.css";

export default function PokemonDetails() {
  let { idPokemon } = useParams();
  const pokemon = useSelector((state) => state.selectPokemon);
  const dispatch = useDispatch();

  const imgType = {
    normal:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/2048px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
    fighting:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/2048px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png",
    flying:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl6n-4e403272-f641-4ec0-a451-49061d40aef6.png/v1/fill/w_894,h_894,strp/flying_type_symbol_galar_by_jormxdos_dffvl6n-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw2bi00ZTQwMzI3Mi1mNjQxLTRlYzAtYTQ1MS00OTA2MWQ0MGFlZjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.xTE63SRI89iYddks3zDYryz4UkqEFOCAOH5_feLbQHs",
    poison:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/1024px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
    ground:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/2048px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",
    rock: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/1024px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
    bug: "https://img.rankedboost.com/wp-content/uploads/2019/11/Bug-Type-Pokemon-Sword-and-Shield.png",
    ghost:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl2d-818164a9-f8e6-41fc-ba4e-c725e2be0d66.png/v1/fill/w_894,h_894,strp/ghost_type_symbol_galar_by_jormxdos_dffvl2d-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwyZC04MTgxNjRhOS1mOGU2LTQxZmMtYmE0ZS1jNzI1ZTJiZTBkNjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.YKEzh2shCheghxM31oOkuEOOrQlMeW1axtKAyK-Iceg",
    steel:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/2048px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
    fire: "https://www.seekpng.com/png/full/353-3532499_badgeleopard-the-energy-types-of-the-pokemon-tcg.png",
    water:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/1024px-Pok%C3%A9mon_Water_Type_Icon.svg.png",
    grass:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl0s-d443a3b4-fa4e-47a6-99b4-d2a769785614.png/v1/fill/w_1280,h_1280,strp/grass_type_symbol_galar_by_jormxdos_dffvl0s-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwwcy1kNDQzYTNiNC1mYTRlLTQ3YTYtOTliNC1kMmE3Njk3ODU2MTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6-S1a0_YYhlP6eXW5QqrJk4jtv6b5a3MRuugxqhJ6EA",
    electric:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/2048px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
    psychic:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3APok%25C3%25A9mon_Psychic_Type_Icon.svg&psig=AOvVaw2cRWhq-cdWRpHv_sTL8m--&ust=1672878299791000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLjzhrfTrPwCFQAAAAAdAAAAABAE",
    ice: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/1200px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
    dragon:
      "https://pm1.narvii.com/6262/0dc57a5edcfe9737890ab871d81eb2a1bc68d6e9_hq.jpg",
    dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/1024px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
    fairy:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/1024px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
    unknown: "",
    shadow: "",
  };

  useEffect(() => {
    if (Object.entries(pokemon).length === 0) {
      dispatch(getById(idPokemon));
    }
  }, [pokemon]);

  if (pokemon.id) {
    return (
      <div className="pokemonDetails">
        <div className="container">
          <div className="top">
            <div>#{pokemon.id}</div>
            <div>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
          </div>

          <div className="mid">
            <div className="imagePokemon">
              <img src={pokemon.img} alt={pokemon.id} />
            </div>

            <div className="stats">
              <ul>
                <li>
                  <b>Hp: </b>
                  {pokemon.hp}
                </li>
                <li>
                  <b>Attack: </b>
                  {pokemon.attack}
                </li>
                <li>
                  <b>Defense: </b>
                  {pokemon.defense}
                </li>
                <li>
                  <b>Speed: </b>
                  {pokemon.speed}
                </li>
                <li>
                  <b>Height: </b>
                  {pokemon.height}
                </li>
                <li>
                  <b>Weight: </b>
                  {pokemon.weight}
                </li>
              </ul>
            </div>
          </div>

          <div className="bot">
            <div className="type1">
              <img src={imgType[pokemon.type1]} alt={pokemon.type1} />
              {" " +
                pokemon.type1.charAt(0).toUpperCase() +
                pokemon.type1.slice(1)}
            </div>
            <div className="type2">
              <img src={imgType[pokemon.type2]} alt={pokemon.type2} />

              {pokemon.type2
                ? " " +
                  pokemon.type2.charAt(0).toUpperCase() +
                  pokemon.type2.slice(1)
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>loading</div>;
}
