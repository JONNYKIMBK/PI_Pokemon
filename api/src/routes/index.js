const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//get pokemons
const { getPokemons, postPokemons } = require("../controllers/pokemons");

// get types
const { getTypes } = require("../controllers/types");

////////////////
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//get all pokemons
router.get("/pokemons", getPokemons);

//get pokemons by id

router.get("/pokemons/:id", getPokemons);

//get all types
router.get("/types", getTypes);

//post new pokemons

router.post("/pokemons", postPokemons);

////////////////////////////
module.exports = router;
