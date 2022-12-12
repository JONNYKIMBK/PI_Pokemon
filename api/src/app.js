const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const axios = require("axios");

require("./db.js");

const server = express();

//array de promesas pokemons
const promisePokemons = require("./controllers/pokemons");

//funcion get types
const { types } = require("./controllers/types");
const { Pokemon } = require("./db");
const { Type } = require("./db");
const { PokemonType } = require("./db");

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//array de pokemons
let pokemons = [];

server.get("/pokemons", async (req, res) => {
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

  if (pokemons.length > 0) res.status(200).json(pokemons);
});

server.get("/types", async (req, res) => {
  const arrayTypes = await types();
  res.status(200).json(arrayTypes);
});

server.post("/pokemons", async (req, res) => {
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
});

module.exports = server;
