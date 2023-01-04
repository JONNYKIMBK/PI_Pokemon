import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchPokemon } from "../../actions/actions";

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
    }

    setName("");
  };

  return (
    <div>
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

        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
}
