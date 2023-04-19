import axios from "axios";

//actions

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS",
  GET_ALL_TYPES = "GET_ALL_TYPES",
  GET_BY_ID = "GET_BY_ID",
  CLEAR = "CLEAR_ID",
  SEARCH_POKEMON = "SEARCH_POKEMON",
  FILTER_ORDER = "FILTER_ORDER",
  PAGINATION = "PAGINATION",
  PAGES = "PAGES",
  NEW_POKEMON = "NEW_POKEMON",
  CHANGE_PAGE = "CHANGE_PAGE";

export const API_POKEMONS = "API_POKEMONS";
/////////

const BACK = process.env.REACT_APP_BACK;

//solo deploy

export function apiPokemons() {
  return async function (dispatch) {
    const promisePokemons = [];

    for (let i = 1; i <= 60; i++) {
      promisePokemons.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    let pokemons = [];

    await Promise.all(
      promisePokemons.map((promise) => axios.get(promise))
    ).then((response) => {
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
    });

    return dispatch({ type: API_POKEMONS, payload: pokemons });
  };
}

////////////////////

export function getAllPokemons() {
  return async function (dispatch) {
    const response = await axios.get(`${BACK}/pokemons`);

    return dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
  };
}

export function searchPokemon(name) {
  return async function (dispatch) {
    name = name.toLowerCase();
    try {
      const response2 = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      let data = response2.data;

      data = {
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
      };

      if (data.id) {
        return dispatch({ type: SEARCH_POKEMON, payload: data });
      } else {
        const response = await axios.get(`${BACK}/pokemons?name=${name}`);
        return dispatch({ type: SEARCH_POKEMON, payload: response.data });
      }
    } catch (error) {
      return dispatch({
        type: SEARCH_POKEMON,
        payload: "no se encontro el pokemon",
      });
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    const response = await axios.get(`${BACK}/types`);

    return dispatch({ type: GET_ALL_TYPES, payload: response.data });
  };
}

export function getById(id) {
  return async function (dispatch) {
    if (id < 1000) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      let data = response.data;

      data = {
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
      };
      return dispatch({ type: GET_BY_ID, payload: data });
    } else {
      const response = await axios.get(`${BACK}/pokemons/${id}`);

      return dispatch({ type: GET_BY_ID, payload: response.data });
    }
  };
}

export function clear() {
  return function (dispatch) {
    return dispatch({ type: CLEAR });
  };
}

export function filterOrder(pokemons, type, order, origin) {
  return function (dispatch) {
    let arrayPokemons = [...pokemons];

    //origin

    if (origin === "API") {
      arrayPokemons = arrayPokemons.filter((pokemon) => {
        if (typeof pokemon.id === "number") return true;
      });
    }

    if (origin === "CREATED") {
      arrayPokemons = arrayPokemons.filter((pokemon) => {
        if (typeof pokemon.id !== "number") return true;
      });
    }

    //////////////////////////////////////

    //type
    if (type !== "") {
      arrayPokemons = arrayPokemons.filter((pokemon) => {
        if (pokemon.type1 === type || pokemon.type2 === type) return true;
      });
    }
    ////////////////////////

    //order
    if (order === "A-Z") {
      arrayPokemons.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (order === "Z-A") {
      arrayPokemons
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .reverse();
    }

    if (order === "Mayor") {
      arrayPokemons.sort((a, b) => {
        return b.attack - a.attack;
      });
    }

    if (order === "Minor") {
      arrayPokemons.sort((a, b) => {
        return a.attack - b.attack;
      });
    }

    ///////////////////////////////////

    return dispatch({ type: FILTER_ORDER, payload: arrayPokemons });
  };
}

export function pagination(pokemons, page) {
  return function (dispatch) {
    let start = 0;

    if (page > 1) {
      start = 12 * (page - 1);
    }

    let end = 12 * page;

    const arrayPage = pokemons.slice(start, end);

    return dispatch({ type: PAGINATION, payload: arrayPage });
  };
}

export function postNewPokemon(pokemon) {
  return function (dispatch) {
    return dispatch({ type: NEW_POKEMON, payload: pokemon });
  };
}
export function changePage(page) {
  return function (dispatch) {
    return dispatch({ type: CHANGE_PAGE, payload: page });
  };
}
