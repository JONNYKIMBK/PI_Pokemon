//actions

import {
  CLEAR,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_BY_ID,
  SEARCH_POKEMON,
  FILTER_ORDER,
  PAGINATION,
} from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  pokemons: [],
  showPokemons: [],

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
        pokemons: action.payload,
        showPokemons: action.payload.slice(0, 12),
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        searchPokemon: action.payload,
        pokemons: [action.payload],
        showPokemons: [action.payload],
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
      };

    case FILTER_ORDER:
      return {
        ...state,
        pokemons: action.payload,
        showPokemons: action.payload.slice(0, 12),
      };

    case PAGINATION:
      return {
        ...state,
        showPokemons: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
