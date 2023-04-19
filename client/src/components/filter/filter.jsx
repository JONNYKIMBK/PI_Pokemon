import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  filterOrder,
  changePage,
  clear,
  apiPokemons,
} from "../../actions/actions";

import "./filter.css";

export default function Filter() {
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");

  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const orderChange = (event) => {
    setOrder(event.target.value);
  };

  const typeChange = (event) => {
    setType(event.target.value);
  };

  const originChange = (event) => {
    setOrigin(event.target.value);
  };

  useEffect(() => {
    dispatch(filterOrder(pokemons.allPokemons, type, order, origin));
    dispatch(changePage(1));
  }, [order, type, origin]);

  const refresh = (event) => {
    event.preventDefault();
    setOrder("");
    setType("");
    setOrigin("");
    dispatch(clear());
    dispatch(getAllPokemons());
    dispatch(changePage(1));

    //API pokemons (deploy)
    dispatch(apiPokemons());
    ///////////////////////////////////////
  };

  return (
    <div className="filterBar">
      <div className="filterElement">
        <form>
          <select name="Orden" value={order} onChange={(e) => orderChange(e)}>
            <option value="">Default order</option>
            <option value="A-Z">A to Z</option>
            <option value="Z-A">Z to A</option>
            <option value="Mayor">Mayor attack</option>
            <option value="Minor">Minor attack</option>
          </select>
        </form>
      </div>

      <div className="filterElement">
        <form>
          <select name="Type" value={type} onChange={(e) => typeChange(e)}>
            <option value="">All types</option>
            {pokemons.types.map((type, index) => {
              return (
                <option value={type} key={index}>
                  {type}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filterElement">
        <form>
          <select
            value={origin}
            onChange={(e) => {
              originChange(e);
            }}
          >
            <option value="">All pokemons</option>
            <option value="API">API</option>
            <option value="CREATED">Created</option>
          </select>
        </form>
      </div>

      <div className="filterElement">
        <form
          onSubmit={(e) => {
            refresh(e);
          }}
        >
          <input type="submit" value="Refresh" />
        </form>
      </div>
    </div>
  );
}
