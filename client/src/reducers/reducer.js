//actions

import {
  CLEAR_ID,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_BY_ID,
} from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  pokemons: [],

  types: [],

  selectPokemon: {},
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

    case GET_BY_ID:
      return {
        ...state,
        selectPokemon: action.payload,
      };

    case CLEAR_ID:
      return {
        ...state,
        selectPokemon: {},
      };

    default:
      return { ...state };
  }
};

export default reducer;
