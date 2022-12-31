import axios from "axios";

//actions

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const FIRST_LOAD = "FIRST_LOAD";

/////////

export function getAllPokemons() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/pokemons");
    console.log(response.data);
    return dispatch({ type: GET_ALL_POKEMONS, payload: response.data });
  };
}
