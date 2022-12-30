import React from "react";
import SearchBar from "../searchBar/searchBar";

import "./navBar.css";

export default function NavBar() {
  return (
    <div>
      <div className="header">
        <img
          src="https://camo.githubusercontent.com/418d92ecbe7cd1805153001a34147ab7c965103432ff4a68eaa2fc5d4e6c1b42/68747470733a2f2f696b2e696d6167656b69742e696f2f6877796b73766a3469762f706f6b656465785f4e5f576757724a4b30732e706e67"
          alt="pokedex"
        />
        <div>
          <SearchBar />
        </div>
      </div>

      <div>aca va una barra de herramientas</div>
    </div>
  );
}
