import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getAllPokemons, typeFilter } from "../../actions/actions";

import "./filter.css";

export default function Filter() {
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");

  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const orderChange = (event) => {
    setOrder(event.target.value);
  };

  const typeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    if (type !== "") {
      dispatch(typeFilter(pokemons.allPokemons, type));
    } else {
      dispatch(getAllPokemons());
    }
  }, [order, type]);

  return (
    <div className="filter">
      <div className="order">
        <form>
          <label for="ord">Order </label>
          <select name="Orden" onChange={(e) => orderChange(e)}>
            <option value="">Default order</option>
            <option value="A-Z">A to Z</option>
            <option value="Z-A">Z to A</option>
            <option value="Mayor">Mayor attack</option>
            <option value="Minor">Minor attack</option>
          </select>
        </form>
        {order}
      </div>

      <div className="type">
        <form>
          <label>Type </label>
          <select name="Type" value={type} onChange={(e) => typeChange(e)}>
            <option value="">-</option>
            {pokemons.types.map((type, index) => {
              return (
                <option value={type} key={index}>
                  {type}
                </option>
              );
            })}
          </select>
        </form>
        {type}
      </div>
    </div>
  );
}
