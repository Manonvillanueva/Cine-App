import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Coups de Coeur</NavLink>
        </li>
      </ul>
      <h1>React Movies</h1>
    </div>
  );
};

export default Header;
