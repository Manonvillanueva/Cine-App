import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Navigation = () => {
  // 1. `data` stocke les résultats des films récupérés via l'API.
  // 2. `search` contient la valeur de recherche "war", qui change en fonction de ce qui est tapé dans l'input de recherche.
  // 3. `sortVote` détermine l'ordre de tri des films selon les notes.
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("war");
  const [sortVote, setSortVote] = useState(null);

  // Utilisation de useEffect pour que les requêtes à l'API se fasse dès l'affichage du composant et dès que search change c'est pour ça qu'il se retrouve dans son tableau de dépendance
  // La fonction setData met à jour data en fonction des résultats de search
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, [search]);

  return (
    <div className="navigationContainer">
      {/* -----------------INPUT CONTAINER  */}
      <div className="formContainer">
        <div className="inputContainer">
          {/* Champ de saisie pour entrer le titre du film à rechercher.
              - Mise à jour en temps réel de la recherche à chaque frappe avec la fonction setSearch
              - Si l'utilisateur efface le champ, la valeur par défaut devient "war". 
              - Déclenche automatiquement une nouvelle requête API via useEffect*/}
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            onChange={(e) =>
              e.target.value ? setSearch(e.target.value) : setSearch("war")
            }
          />
        </div>
        {/* SortVote change d'état en fonction du bonton cliqué afin de trier les films
        - Si `badToGood` est sélectionné, on trie du moins bien noté au mieux noté.
        - Si `goodToBad` est sélectionné, on trie du mieux noté au moins bien noté. */}
        <div className="btnContainer">
          <button onClick={() => setSortVote("goodToBad")}>
            Top <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button onClick={() => setSortVote("badToGood")}>
            Flop <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </div>

      {/* --------------DISPLAY MOVIE  */}
      <ul id="ulListMovie">
        {/* Liste des films récupérés via l'API. 
          - Les films sont triés selon l'état `sortVote` grâce à data.sort.
          - Ensuite, pour chaque film, on affiche un composant `Cards` qui reçoit la prop "movie grâce à movie={movie} */}
        {data
          .sort((a, b) => {
            if (sortVote === "badToGood") {
              return a.vote_average - b.vote_average;
            } else if (sortVote === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else {
              return 0;
            }
          })
          .map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
      </ul>
    </div>
  );
};

export default Navigation;
