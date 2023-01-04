import axios from "axios";

//actions

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS",
  GET_ALL_TYPES = "GET_ALL_TYPES",
  GET_BY_ID = "GET_BY_ID",
  CLEAR = "CLEAR_ID",
  SEARCH_POKEMON = "SEARCH_POKEMON";

/////////

export function getAllPokemons(name) {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/pokemons");

    return dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
  };
}

export function searchPokemon(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
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
    const response = await axios.get("http://localhost:3001/types");

    return dispatch({ type: GET_ALL_TYPES, payload: response.data });
  };
}

export function getById(id) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);

    return dispatch({ type: GET_BY_ID, payload: response.data });
  };
}

export function clear() {
  return function (dispatch) {
    return dispatch({ type: CLEAR });
  };
}
