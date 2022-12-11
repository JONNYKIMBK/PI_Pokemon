const promisePokemons = [];

for (let i = 1; i <= 40; i++) {
  promisePokemons.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
}

module.exports = promisePokemons;
