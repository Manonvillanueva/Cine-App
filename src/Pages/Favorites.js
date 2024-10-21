import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import Cards from "../Components/Cards";

const Favorites = () => {
  const [favMovie, setFavMovie] = useState([]);

  useEffect(() => {
    const moviesId = window.localStorage.movie
      ? JSON.parse(window.localStorage.movie)
      : [];
    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR`
        )
        .then((res) => {
          setFavMovie((listMovie) => [...listMovie, res.data]);
        });
    }
  }, []);

  return (
    <div>
      <Header />

      {favMovie.map((movies) => (
        <Cards key={movies.id} movie={movies} />
      ))}
      <p></p>
    </div>
  );
};

export default Favorites;
