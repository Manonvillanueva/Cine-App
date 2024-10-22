import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="headerContainer">
      {/* Titre du site  */}
      <h1>React Movies</h1>
      <ul className="ulNavigation">
        {/* Lien pour la page Accueil */}
        <li>
          {/* Rajout de la classe a-active pour le style  */}
          <NavLink to="/" className={(nav) => (nav.isActive ? "a-active" : "")}>
            Accueil
          </NavLink>
        </li>
        {/* Lien pour la page coups de coeur  */}
        <li>
          {/* Rajout de la classe a-active pour le style  */}
          <NavLink
            to="/favorites"
            className={(nav) => (nav.isActive ? "a-active" : "")}
          >
            Coups de Coeur
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
