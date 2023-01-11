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

/////////

const BACK = process.env.REACT_APP_BACK;

export function getAllPokemons() {
  return async function (dispatch) {
    const response = await axios.get(`${BACK}/pokemons`);

    return dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
  };
}

export function searchPokemon(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${BACK}/pokemons?name=${name}`);
      return dispatch({ type: SEARCH_POKEMON, payload: response.data });
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
    const response = await axios.get(`${BACK}/pokemons/${id}`);

    return dispatch({ type: GET_BY_ID, payload: response.data });
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
