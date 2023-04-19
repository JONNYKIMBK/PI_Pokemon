//actions

import {
  CLEAR,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_BY_ID,
  SEARCH_POKEMON,
  FILTER_ORDER,
  PAGINATION,
  NEW_POKEMON,
  CHANGE_PAGE,
  API_POKEMONS,
} from "../actions/actions";

//////////

const initialState = {
  allPokemons: [],
  pokemons: [],
  showPokemons: [],

  types: [],

  searchPokemon: {},
  selectPokemon: {},
  newPokemon: {},

  page: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //API pokemons (deploy)

    case API_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload.concat(state.allPokemons),
        pokemons: action.payload.concat(state.pokemons),
        showPokemons: action.payload.slice(0, 12),
      };

    ///////////////////////////////////

    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: state.allPokemons.concat(action.payload),
        pokemons: state.pokemons.concat(action.payload),
        // showPokemons: action.payload.slice(0, 12),
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
        allPokemons: [],
        pokemons: [],
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

    case NEW_POKEMON:
      return {
        ...state,
        newPokemon: action.payload,
      };

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
