import React, { useEffect, useState } from "react";
import defaultPoster from "../assets/img/poster.jpg";
import axios from "axios";

// Le composant `Cards` prend la prop `movie` qui contient les informations d'un film spécifique via le composant Navigation.
const Cards = ({ movie }) => {
  // 1. URL de base pour récupérer les images des films
  // 2. `dataGenre` stocke la liste des genres récupérés depuis l'API
  const urlImg = "https://image.tmdb.org/t/p/original/";
  const [dataGenre, setDataGenre] = useState([]);

  // - Fonction pour filtrer les genres du film , gère deux cas :
  const filterGenre = () => {
    // Cas où les genres sont déjà inclus dans l'objet movie (PAGE FAVORITE)
    // donc on peut directement utiliser les genres sans avoir besoin de les filtrer.
    if (movie.genres) {
      return movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>);
    }
    // Cas où on a seulement les IDs des genres (PAGE HOME)
    // On doit donc croiser les `genre_ids` de l'objet `movie` avec les informations complètes des genres (dans `dataGenre`).
    return (
      dataGenre
        // On utilise `filter` pour ne garder que les genres dont l'ID est présent dans `movie.genre_ids`.
        .filter((category) => movie.genre_ids.includes(category.id))
        // Après avoir filtré, on mappe chaque catégorie correspondante en un élément <li> qui affiche le nom du genre.
        .map((category) => <li key={category.id}>{category.name}</li>)
    );
  };

  // Fonction pour ajouter ou supprimer un film des favoris et du localStorage
  const addOrDeleteFavorite = () => {
    // Récupère les films dans le localStorage et les stocke dans savedMovie
    const savedMovie = localStorage.getItem("movie");
    // Parse les favoris existants ou initialise un tableau vide
    let favMovie = savedMovie ? JSON.parse(savedMovie) : [];
    // CAS 1 : AJOUTER AUX FAVORIS
    // La présence de genre_ids indique que le film est dans la PAGE HOME
    if (movie.genre_ids) {
      // Si l'ID du film (movie.ID) n'est pas dans `favMovie`, cela signifie que ce film n'a pas encore été ajouté aux favoris.
      if (!favMovie.includes(movie.id)) {
        // Ajoute l'ID uniquement si pas déjà présent
        favMovie.push(movie.id);
        // Sauvegarde à nouveau la liste des favoris dans le localStorage en format JSON.
        localStorage.setItem("movie", JSON.stringify(favMovie));
      }
    } else {
      // CAS 2 : SUPPRESSION DES FAVORIS
      // L'absence de genre_ids indique que le film est déjà en favoris
      // Pour chaque élément du tableau favMovie , la fonction compare cet id à movie.id(film que l'on veut supp)
      // - Si la comparaison retourne true, l'élément est gardé
      // - Si la comparaison retourne false, l'élément est éliminé
      const newData = favMovie.filter((id) => id !== movie.id);
      // Met à jour le localStorage avec la nouvelle liste de favoris qui ne contient plus le film supprimé.
      localStorage.setItem("movie", JSON.stringify(newData));
      // Rechargement de la page pour refléter les changements visuels
      window.location.reload();
    }
  };

  // Utilisation de useEffect pour récupérer les données de l'API des genres grâce à la fonction setDataGenre lors de l'affichage du composant Cards
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR"
      )
      .then((res) => setDataGenre(res.data.genres));
  }, []);

  return (
    <li id="listMovie">
      {/* - Image du film : si une image est disponible, on l'affiche(concaténation de l'URL avec la donnée de l'API), sinon on affiche l'image par défaut. */}
      <img
        src={
          movie.backdrop_path
            ? `${urlImg}${movie.backdrop_path}`
            : defaultPoster
        }
        alt={`affiche de ${movie.title}`}
      />
      <div id="headerCard">
        <h2>{movie.title}</h2>
        {/* Date de sortie
          - Convertit le format AAAA-MM-JJ en JJ-MM-AAAA
          - Utilise split("-") pour diviser la date
          - reverse() pour inverser l'ordre
          - join("-") pour reformer la date avec des tirets */}
        <p id="releaseDate">
          Sorti le :
          {movie.release_date
            ? movie.release_date.split("-").reverse().join("-")
            : null}
        </p>
        {/* Note moyenne du film
          - Arrondie à une décimale via Math.round(x * 10) / 10 */}
        <p id="note">
          {Math.round(movie.vote_average * 10) / 10} / 10
          <i className="fa-solid fa-star"></i>
        </p>
        {/* Appel de la fonction `filterGenre` pour afficher la liste des genres */}
        <ul id="ulGenre">
          {movie.genre_ids || movie.genres ? filterGenre() : null}
        </ul>
      </div>
      <p id="overviewSynopsis">
        <span id="synopsis">Synopsis :</span>
        {movie.overview}
      </p>
      {/* Bouton de gestion des favoris
        - Texte conditionnel selon la page (Home ou Favoris)
        - Déterminé par la présence de genre_ids :
          * Présent = page Home → "Ajouter aux favoris"
          * Absent = page Favoris → "Supprimer de mes favoris" */}
      <div id="btnContainer">
        <button onClick={addOrDeleteFavorite}>
          {movie.genre_ids ? "Ajouter aux favoris" : "Supprimer de mes favoris"}
        </button>
      </div>
    </li>
  );
};

export default Cards;
