//actions

import {
  CLEAR,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_BY_ID,
  SEARCH_POKEMON,
} from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  types: [],

  searchPokemon: {},

  selectPokemon: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        searchPokemon: action.payload,
        allPokemons: [action.payload],
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

    case CLEAR:
      return {
        ...state,
        selectPokemon: {},
        searchPokemon: "",
      };

    default:
      return { ...state };
  }
};

export default reducer;
