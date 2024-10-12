import axios from "axios";
import React, { useEffect, useState } from "react";
const Test = ({ dataSend }) => {
  const [dataGenre, setDataGenre] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=cd100debd32790befdf1a810dcd36ddd&language=fr-FR"
      )
      .then((res) => setDataGenre(res.data.genres));
  }, []);
  return (
    <div>
      {dataSend.map((movie) => (
        <h2>
          {dataGenre
            .filter((category) => movie.genre_ids.includes(category.id))
            .map((category) => category.name)
            .join(" ")}
        </h2>
      ))}
    </div>
  );
};

export default Test;
