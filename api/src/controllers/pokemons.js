const axios = require("axios");

//Tablas
const { Pokemon } = require("../db");
const { Type } = require("../db");
const { PokemonType } = require("../db");

//////////////

let pokemons = [];

const promisePokemons = [];

for (let i = 1; i <= 60; i++) {
  promisePokemons.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

const getPokemons = async (req, res) => {
  pokemons = [];

  //pokemons de api

  await Promise.all(promisePokemons.map((promise) => axios.get(promise)))
    .then((response) => {
      for (let i = 0; i < response.length; i++) {
        let data = response[i].data;
        pokemons.push({
          id: data.id,
          name: data.name,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          img: data.sprites.other.dream_world.front_default,
          type1: data.types[0].type.name,
          type2: data.types[1] ? data.types[1].type.name : null,
          height: data.height,
          weight: data.weight,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "No se pudo conectar a la api",
      });
    });

  /////////////////////////////////////////////

  //pokemons de base de datos

  try {
    const pokemonsDB = await Pokemon.findAll();

    pokemons = pokemons.concat(pokemonsDB);
  } catch (error) {
    console.log("no se encontraron los pokemons de la base de datos");
  }
  ////////////////////////////////////////////////

  //devuelve el query name

  try {
    const { name } = req.query;

    if (name) {
      const queryPokemon = pokemons.find((pokemon) => {
        return pokemon.name.toLowerCase() === name.toLowerCase();
      });

      if (queryPokemon === undefined) throw new Error();
      return res.status(200).json(queryPokemon);
    }
  } catch {
    return res.status(400).send("No existe pokemon con ese nombre");
  }

  /////////////////////////////////////////

  try {
    const { id } = req.params;

    if (id) {
      const pokemonByID = pokemons.find((pokemon) => {
        return pokemon.id == id;
      });

      return res.status(200).json(pokemonByID);
    }
  } catch {
    console.log("No se ingreso ID");
  }

  //devuelve todos los pokemons
  if (pokemons.length > 0) res.status(200).json(pokemons);
};

const postPokemons = async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    img,
    type1,
    type2,
    height,
    weight,
  } = req.body;

  //si falta el nombre retorna un error

  if (!name) {
    return res.status(400).json({
      error: "Falta el nombre",
    });
  }

  ////////////////////////////////////
  const pokemon = {
    name,
    hp,
    attack,
    defense,
    speed,
    img,
    type1,
    type2,
    height,
    weight,
  };

  try {
    //crea el pokemon nuevo
    const newPokemon = await Pokemon.create(pokemon);

    ////////////////////////////////////////////////////////////

    //se agrega el tipo 1
    const typeAdd1 = await Type.findOne({
      where: {
        name_type: type1,
      },
    });

    await newPokemon.addType(typeAdd1, { through: PokemonType });

    ///////////////////////////////////////////////////////////////

    //si existe un segundo tipo tambien se agrega
    if (type2) {
      const typeAdd2 = await Type.findOne({
        where: {
          name_type: type2,
        },
      });

      await newPokemon.addType(typeAdd2, { through: PokemonType });
    }
    ///////////////////////////////////////////////

    //se devuelve el nuevo pokemon
    res.json(newPokemon);
  } catch (error) {
    res.status(400).send("No se pudo crear el Pokemon");
  }
};

module.exports = { getPokemons, postPokemons };
