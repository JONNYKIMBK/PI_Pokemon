//actions

import { GET_ALL_POKEMONS, GET_ALL_TYPES } from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  pokemons: [],

  types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
