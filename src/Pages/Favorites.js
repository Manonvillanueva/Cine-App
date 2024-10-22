import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import Cards from "../Components/Cards";

const Favorites = () => {
  // `favMovie`stocke la liste de film favoris
  const [favMovie, setFavMovie] = useState([]);

  // / Utilisation de useEffect pour récupérer les données des films favoris uniquement lors de l'affichage de la page Favorites, car son tableau de dépendance est vide
  useEffect(() => {
    // Récupération des IDs de films stockés dans le localStorage sous la clé "movie"
    const moviesId = window.localStorage.movie
      ? JSON.parse(window.localStorage.movie)
      : [];
    // Boucle sur chaque ID de film trouvé dans le localStorage pour récupérer les détails du film depuis l'API
    for (let i = 0; i < moviesId.length; i++) {
      // Requête à l'API pour récupérer les informations du film en utilisant son ID.
      // L'ID du film est ajouté dynamiquement à l'URL à chaque itération.
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR`
        )
        // On utilise la fonction de mise à jour `setFavMovie` pour ajouter chaque film à la liste des films favoris.
        // La syntaxe `listMovie => [...listMovie, res.data]` permet de conserver les films déjà présents dans `favMovie` et d'ajouter le nouveau film reçu via `res.data`.
        .then((res) => {
          setFavMovie((listMovie) => [...listMovie, res.data]);
        });
    }
  }, []);

  return (
    <div>
      <Header />

      <ul id="favoriteListMovie">
        {/* Parcours`favMovie` pour afficher chaque film sous la forme d'un composant `Cards`. 
            Récupération des informations via la prop "movie"qui sont utilisés  pour afficher les détails du film. */}
        {favMovie.map((movies) => (
          <Cards key={movies.id} movie={movies} />
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
