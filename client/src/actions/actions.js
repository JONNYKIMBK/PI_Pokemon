import axios from "axios";

//actions

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS",
  GET_ALL_TYPES = "GET_ALL_TYPES";

/////////

export function getAllPokemons() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/pokemons");

    return dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
  };
}

export function getTypes() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/types");

    return dispatch({ type: GET_ALL_TYPES, payload: response.data });
  };
}
