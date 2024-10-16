import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      <ul className="ulNavigation">
        <li>
          <NavLink to="/" className={(nav) => (nav.isActive ? "a-active" : "")}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={(nav) => (nav.isActive ? "a-active" : "")}
          >
            Coups de Coeur
          </NavLink>
        </li>
      </ul>
      <h1>React Movies</h1>
    </div>
  );
};

export default Header;
