import React, { useEffect, useState } from "react";
import defaultPoster from "../assets/img/poster.jpg";
import axios from "axios";

const Cards = ({ movie }) => {
  const urlImg = "https://image.tmdb.org/t/p/original/";
  const [dataGenre, setDataGenre] = useState([]);

  const addFavorites = () => {
    const savedMovie = localStorage.getItem("movie");
    let favMovie = savedMovie ? JSON.parse(savedMovie) : [];
    favMovie.push(movie.id);
    localStorage.setItem("movie", JSON.stringify(favMovie));
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR"
      )
      .then((res) => setDataGenre(res.data.genres));
  }, []);

  return (
    <li>
      <img
        src={
          movie.backdrop_path
            ? `${urlImg}${movie.backdrop_path}`
            : defaultPoster
        }
        alt={`affiche de ${movie.title}`}
      />
      <h2>{movie.title}</h2>
      <h3>{movie.id}</h3>
      {/* Pour inverser la date :
            1. .split("-"), qui divise la chaîne au niveau des tirets en créant un tableau
            2. .reverse() inverse l'ordre des éléments du tableau
            3. .join("-") reconstruit une chaîne de caractère en concaténant tous les éléments du tableau , séparés par des tirets */}
      <p>Sorti le : {movie.release_date.split("-").reverse().join("-")}</p>
      <p>
        {Math.round(movie.vote_average * 10) / 10}{" "}
        <i className="fa-solid fa-star"></i>
      </p>
      <p>
        {dataGenre
          .filter((category) => movie.genre_ids.includes(category.id))
          .map((category) => category.name)
          .join(" ")}
      </p>
      <p>{movie.overview}</p>
      <button onClick={addFavorites}>Ajouter aux favoris</button>
    </li>
  );
};

export default Cards;
