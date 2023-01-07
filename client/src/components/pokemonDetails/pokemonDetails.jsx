import React, { useEffect } from "react";
import { getAllPokemons, getById } from "../../actions/actions";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./pokemonDetails.css";

export default function PokemonDetails() {
  let { idPokemon } = useParams();
  const pokemons = useSelector((state) => state);
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
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/768px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
    ice: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/1200px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
    dragon:
      "https://pm1.narvii.com/6262/0dc57a5edcfe9737890ab871d81eb2a1bc68d6e9_hq.jpg",
    dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/1024px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
    fairy:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/1024px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png",
    unknown: "",
    shadow:
      "https://images.saymedia-content.com/.image/t_share/MTc0NDU3ODYxNzg1Nzg5ODAw/best-attacks-in-pokemon-go.png",
  };

  useEffect(() => {
    if (Object.entries(pokemons.selectPokemon).length === 0) {
      dispatch(getById(idPokemon));
    }

    if (pokemons.pokemons.length < 40 || pokemons.pokemons.length > 80) {
      dispatch(getAllPokemons());
    }
  }, [pokemons.selectPokemon]);

  if (pokemons.selectPokemon.id) {
    return (
      <div className="pokemonDetails">
        <div className="container">
          <div className="top">
            <div>#{pokemons.selectPokemon.id}</div>
            <div>
              {pokemons.selectPokemon.name.charAt(0).toUpperCase() +
                pokemons.selectPokemon.name.slice(1)}
            </div>
          </div>

          <div className="mid">
            <div className="imagePokemon">
              <img
                src={pokemons.selectPokemon.img}
                alt={pokemons.selectPokemon.id}
              />
            </div>

            <div className="stats">
              <ul>
                <li>
                  <b>Hp: </b>
                  {pokemons.selectPokemon.hp}
                </li>
                <li>
                  <b>Attack: </b>
                  {pokemons.selectPokemon.attack}
                </li>
                <li>
                  <b>Defense: </b>
                  {pokemons.selectPokemon.defense}
                </li>
                <li>
                  <b>Speed: </b>
                  {pokemons.selectPokemon.speed}
                </li>
                <li>
                  <b>Height: </b>
                  {pokemons.selectPokemon.height}
                </li>
                <li>
                  <b>Weight: </b>
                  {pokemons.selectPokemon.weight}
                </li>
              </ul>
            </div>
          </div>

          <div className="bot">
            <div className="type1">
              <img
                src={imgType[pokemons.selectPokemon.type1]}
                alt={pokemons.selectPokemon.type1}
              />
              {" " +
                pokemons.selectPokemon.type1.charAt(0).toUpperCase() +
                pokemons.selectPokemon.type1.slice(1)}
            </div>
            <div className="type2">
              <img
                src={imgType[pokemons.selectPokemon.type2]}
                alt={pokemons.selectPokemon.type2}
              />

              {pokemons.selectPokemon.type2
                ? " " +
                  pokemons.selectPokemon.type2.charAt(0).toUpperCase() +
                  pokemons.selectPokemon.type2.slice(1)
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>loading</div>;
}
