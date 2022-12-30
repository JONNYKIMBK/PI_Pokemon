import axios from "axios";

//actions

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";

/////////

export const getAllPokemons = async (dispatch) => {
  await axios
    .get("http://localhost:3001/pokemons")
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_ALL_POKEMONS, payload: json });
    });
};
