import React from "react";
import defaultPoster from "../assets/img/poster.jpg";

const Cards = ({ dataSend }) => {
  const urlImg = "https://image.tmdb.org/t/p/original/";

  return (
    <div>
      <h1>testcard</h1>
      <h2>testcard</h2>
      <ul>
        {dataSend.map((movie) => (
          <li key={movie.id}>
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
              Sortie le : {movie.release_date.split("-").reverse().join("-")}
            </p>
            <p>{movie.vote_average}</p>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cards;
