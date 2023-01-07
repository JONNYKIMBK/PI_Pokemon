import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTypes, postNewPokemon } from "../../actions/actions";

import "./newPokemon.css";

export default function NewPokemon() {
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    img: null,
    type1: "normal",
    type2: null,
    height: null,
    weight: null,
  });
  const [error, setError] = useState({
    nameEmpty: "errorBlock",
    nameOnlyLetters: "errorBlock",
    urlInvalid: "errorBlock",
  });
  const [urlImage, setUrlImage] = useState({
    noimage: "imageTrue",
    image: "imageBlock",
  });
  const [fail, setFail] = useState("");

  const pokemons = useSelector((state) => state);
  const dispatch = useDispatch();

  const nameChange = (event) => {
    setNewPokemon({
      ...newPokemon,
      name: event.target.value,
    });
    const pattern = new RegExp("^[A-Z]+$", "i");

    const voidInput = event.target.value.length;

    if (voidInput === 0) {
      setError({
        ...error,
        nameEmpty: "error",
      });
    } else {
      setError({
        ...error,
        nameEmpty: "errorBlock",
      });

      if (!pattern.test(event.target.value)) {
        setError({
          ...error,
          nameOnlyLetters: "error",
          nameEmpty: "errorBlock",
        });
      } else {
        setError({
          ...error,
          nameOnlyLetters: "errorBlock",
          nameEmpty: "errorBlock",
        });
      }
    }
  };

  const urlChange = (event) => {
    setNewPokemon({
      ...newPokemon,
      img: event.target.value,
    });

    const pattern = new RegExp(
      /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg|.webp|.gif)(\?[^\s[",><]*)?/g
    );

    if (!pattern.test(event.target.value)) {
      setError({
        ...error,
        urlInvalid: "error",
      });
      setUrlImage({
        ...urlImage,
        noimage: "imageTrue",
        image: "imageBlock",
      });
    } else {
      setError({
        ...error,
        urlInvalid: "errorBlock",
      });
      setUrlImage({
        ...urlImage,
        noimage: "imageBlock",
        image: "imageTrue",
      });
    }
  };

  const handleChange = (event) => {
    let prop = event.target.name;
    let value = event.target.value;

    setNewPokemon({
      ...newPokemon,
      [prop]: value,
    });
  };

  const createPokemon = (event) => {
    event.preventDefault();

    const pattern = new RegExp("^[A-Z]+$", "i");
    const voidInput = newPokemon.name.length;

    if (voidInput === 0 || !pattern.test(newPokemon.name)) {
      setFail(true);
    } else {
      axios
        .post("http://localhost:3001/pokemons", {
          name: newPokemon.name,
          hp: newPokemon.hp,
          attack: newPokemon.attack,
          defense: newPokemon.defense,
          speed: newPokemon.speed,
          img: newPokemon.img,
          type1: newPokemon.type1,
          type2: newPokemon.type2,
          height: newPokemon.height,
          weight: newPokemon.weight,
        })
        .then((response) => {
          dispatch(postNewPokemon(response.data));
        });
    }
  };

  useEffect(() => {
    if (pokemons.types.length < 1) {
      dispatch(getTypes());
    }
  }, [pokemons, fail]);

  return (
    <div>
      <div className="header">
        <NavLink to="/home">
          <img
            src="https://camo.githubusercontent.com/418d92ecbe7cd1805153001a34147ab7c965103432ff4a68eaa2fc5d4e6c1b42/68747470733a2f2f696b2e696d6167656b69742e696f2f6877796b73766a3469762f706f6b656465785f4e5f576757724a4b30732e706e67"
            alt="pokedex"
          />
        </NavLink>
      </div>

      <div className="newContainer">
        <div className="formNewPokemon">
          <form>
            <div className="values">
              <label>Name (*)</label>
              <input
                type="text"
                value={newPokemon.name}
                onChange={(e) => {
                  nameChange(e);
                }}
              />
            </div>

            {/* name errors */}
            <div className={error.nameEmpty}>name is required</div>
            <div className={error.nameOnlyLetters}>
              name can only contain letters
            </div>

            {/* //////////////////////////// */}

            <div className="values">
              <label>HP </label>
              <input
                type="number"
                value={newPokemon.hp}
                name="hp"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Attack </label>
              <input
                type="number"
                value={newPokemon.attack}
                name="attack"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Defense </label>
              <input
                type="number"
                value={newPokemon.defense}
                name="defense"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Speed </label>
              <input
                type="number"
                value={newPokemon.speed}
                name="speed"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Height </label>
              <input
                type="number"
                value={newPokemon.height}
                name="height"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Weight </label>
              <input
                type="number"
                value={newPokemon.weight}
                name="weight"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="values">
              <label>Image (url) </label>
              <input
                type="text"
                value={newPokemon.img}
                onChange={(e) => {
                  urlChange(e);
                }}
              />
            </div>
            <div className={error.urlInvalid}>Invalid URL</div>

            <div className="values">
              <label>Type 1 </label>
              <select
                name="type1"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {pokemons.types.map((type, index) => {
                  return (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  );
                })}
              </select>
              <label> Type 2 (optional) </label>
              <select
                name="type2"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="null">-</option>
                {pokemons.types.map((type, index) => {
                  return (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            <input
              type="submit"
              value="Create"
              onClick={(e) => {
                createPokemon(e);
              }}
            />
          </form>
        </div>

        <div className="newImage">
          <label>Image</label>
          <img
            className={urlImage.noimage}
            src="https://www.pngitem.com/pimgs/m/30-302283_pikachu-pokmon-go-silhouette-drawing-whos-that-pokemon.png"
            alt=""
          />
          <img className={urlImage.image} src={newPokemon.img} alt="" />
        </div>
      </div>
    </div>
  );
}
