//actions

import {
  CLEAR,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_BY_ID,
  FILTER,
  SEARCH_POKEMON,
  TYPE_FILTER,
} from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  pokemons: [],
  types: [],

  searchPokemon: {},
  selectPokemon: {},

  filter: {
    order: [],
    type: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        searchPokemon: action.payload,
        allPokemons: [action.payload],
        pokemons: [action.payload],
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
        searchPokemon: {},
        filter: {
          order: [],
          type: [],
        },
      };

    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case TYPE_FILTER:
      return {
        ...state,
        pokemons: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
