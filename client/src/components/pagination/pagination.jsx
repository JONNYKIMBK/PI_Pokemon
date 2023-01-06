import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../../actions/actions";

import "./pagination.css";

export default function Pagination() {
  const [page, setPage] = useState(1);

  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const pages = Math.ceil(pokemons.pokemons.length / 12);

  const arrayPages = [];
  for (let i = 0; i < pages; i++) {
    arrayPages.push(i + 1);
  }

  const handleSubmit = (event) => {
    setPage(event.target.value);
  };

  useEffect(() => {
    dispatch(pagination(pokemons.pokemons, page));
  }, [page]);

  return (
    <div className="pagination">
      <div className="buttons">
        {"<<"}
        {arrayPages.map((pages) => {
          return (
            <input
              type="submit"
              value={pages}
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          );
        })}
        {">>"}
      </div>
    </div>
  );
}
