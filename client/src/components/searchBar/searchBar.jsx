import React from "react";

import "./searchBar.css";

export default function SearchBar() {
  return (
    <div>
      <form>
        <input type="text" placeholder="name" />

        <input type="submit" />
      </form>
    </div>
  );
}
