const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const axios = require("axios");

require("./db.js");

const server = express();

//array de promesas pokemons
const promisePokemons = require("./routes/get/pokemons");

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
          types: [
            data.types[0].type.name,
            data.types[1] ? data.types[1].type.name : null,
          ],
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

module.exports = server;
