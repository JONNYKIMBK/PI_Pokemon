import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchPokemon, changePage } from "../../actions/actions";

import "./searchBar.css";

export default function SearchBar() {
  const [name, setName] = useState("");

  const pokemon = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== "") {
      dispatch(searchPokemon(name));
      dispatch(changePage(1));
    }

    setName("");
  };

  if (Object.entries(pokemon.selectPokemon).length === 0) {
    return (
      <div className="searchBar">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => handleChange(e)}
          />

          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }

  return <div></div>;
}
