import React, { useEffect, useState } from "react";
import "./Landingpage.css";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { getAllPokemons } from "../../actions/actions";

export default function Landingpage() {
  const [start, setStart] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons);
  });

  const buttonChange = () => {
    setStart(!start);
  };

  return (
    <div className="landing">
      <div className="logo">
        <img
          src="https://camo.githubusercontent.com/418d92ecbe7cd1805153001a34147ab7c965103432ff4a68eaa2fc5d4e6c1b42/68747470733a2f2f696b2e696d6167656b69742e696f2f6877796b73766a3469762f706f6b656465785f4e5f576757724a4b30732e706e67"
          alt="pokedex"
        />
      </div>

      <div
        className={start ? "start2" : "start"}
        onMouseOver={buttonChange}
        onMouseOut={buttonChange}
      >
        <NavLink to="/home">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5261/5261929.png"
            alt="start-botton"
          />
        </NavLink>
      </div>
    </div>
  );
}
