import React from "react";

import { useDispatch, useSelector } from "react-redux";

import "./pokemonBasic.css";

export default function PokemonBasic() {
  const state = useSelector((state) => state);

  console.log(state);

  return (
    <div className="pokemonbasic">
      <div className="card-body">aca va un pokemon</div>
    </div>
  );
}
