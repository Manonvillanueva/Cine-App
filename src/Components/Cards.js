import React, { useEffect, useState } from "react";
import defaultPoster from "../assets/img/poster.jpg";
import axios from "axios";

const Cards = ({ movie }) => {
  const urlImg = "https://image.tmdb.org/t/p/original/";
  const [dataGenre, setDataGenre] = useState([]);

  const filterGenre = () => {
    if (movie.genres) {
      return movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>);
    }
    return dataGenre
      .filter((category) => movie.genre_ids.includes(category.id))
      .map((category) => <li key={category.id}>{category.name}</li>);
  };

  const addOrDeleteFavorite = () => {
    const savedMovie = localStorage.getItem("movie");
    let favMovie = savedMovie ? JSON.parse(savedMovie) : [];
    if (movie.genre_ids) {
      if (!favMovie.includes(movie.id)) {
        favMovie.push(movie.id);
        localStorage.setItem("movie", JSON.stringify(favMovie));
      }
    } else {
      const newData = favMovie.filter((id) => id !== movie.id);
      localStorage.setItem("movie", JSON.stringify(newData));
      window.location.reload();
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR"
      )
      .then((res) => setDataGenre(res.data.genres));
  }, []);

  return (
    <li id="listMovie">
      <img
        src={
          movie.backdrop_path
            ? `${urlImg}${movie.backdrop_path}`
            : defaultPoster
        }
        alt={`affiche de ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      {/* Pour inverser la date :
            1. .split("-"), qui divise la chaîne au niveau des tirets en créant un tableau
            2. .reverse() inverse l'ordre des éléments du tableau
            3. .join("-") reconstruit une chaîne de caractère en concaténant tous les éléments du tableau , séparés par des tirets */}
      <p>
        Sorti le :
        {movie.release_date
          ? movie.release_date.split("-").reverse().join("-")
          : null}
      </p>
      <p>
        {Math.round(movie.vote_average * 10) / 10} / 10
        <i className="fa-solid fa-star"></i>
      </p>
      <ul>{movie.genre_ids || movie.genres ? filterGenre() : null}</ul>
      <p>{movie.overview}</p>
      <button onClick={addOrDeleteFavorite}>
        {movie.genre_ids ? "Ajouter aux favoris" : "Supprimer de mes favoris"}
      </button>
    </li>
  );
};

export default Cards;
