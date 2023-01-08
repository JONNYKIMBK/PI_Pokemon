import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, pagination } from "../../actions/actions";

import "./pagination.css";

export default function Pagination() {
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState({
    1: "selectPage",
  });

  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const pages = Math.ceil(pokemons.pokemons.length / 12);

  const arrayPages = [];
  for (let i = 0; i < pages; i++) {
    arrayPages.push(i + 1);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setPage(event.target.value);
  };

  useEffect(() => {
    if (pokemons.page === 1) {
      setSelect({
        1: "selectPage",
      });
      setPage(1);
      dispatch(changePage(""));

      dispatch(pagination(pokemons.pokemons, page));
    } else {
      dispatch(pagination(pokemons.pokemons, page));

      setSelect({
        [page]: "selectPage",
      });
    }
  }, [page, pokemons.page]);

  return (
    <div className="pagination">
      <div className="buttons">
        {"<< "}
        {arrayPages.map((pages) => {
          return (
            <input
              type="submit"
              value={pages}
              className={select[pages]}
              key={pages}
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          );
        })}
        {" >>"}
      </div>
    </div>
  );
}
