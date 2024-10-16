import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

const Favorites = () => {
  const [favMovie, setFavMovie] = useState([]);
  useEffect(() => {
    const getFavMovies = localStorage.getItem("movie");
    const movieArray = getFavMovies ? JSON.parse(getFavMovies) : [];
    setFavMovie(movieArray);
  }, []);
  return (
    <div>
      <Header />
      <p>Mes coups de coeur</p>
    </div>
  );
};

export default Favorites;
